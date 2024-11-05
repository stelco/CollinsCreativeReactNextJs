import { generateYAxisSkills } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { exo2 } from '@/app/ui/fonts';
import { Skill } from '@/app/lib/definitions';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "https://www.collinscreative.co.uk/graphql";

export default async function SkillsChart() {
  const chartHeight = 350;

  if (!GRAPHQL_ENDPOINT) {
    console.error("GraphQL endpoint is not defined");
    return <p className="mt-4 text-gray-400">Failed to load data.</p>;
  } else {
    console.log("GraphQL endpoint:", GRAPHQL_ENDPOINT);
  }

  // Fetch skills data from GraphQL endpoint
  let data;
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: /* GraphQL */ `
          {
            skills {
              id
              name
              color
              percentage
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    data = result.data;
  } catch (error) {
    console.error("Error fetching skills data:", error);
    return <p className="mt-4 text-gray-400">Failed to load data.</p>;
  }

  const skills: Skill[] = data.skills;

  // Filter filteredSkills to only include those with a defined percentage
  const filteredSkills = skills.filter((skill: Skill) => skill.percentage !== null);

  const { yAxisLabels, topLabel } = generateYAxisSkills(filteredSkills);

  if (!filteredSkills || filteredSkills.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${exo2.className} mb-4 text-xl md:text-2xl`}>
        Skills Chart
      </h2>

      <div className="rounded-xl bg-gray-100 p-4">
        <div className="sm:grid-cols-10 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {filteredSkills.map((skill) => (
            <div key={skill.name} className="flex flex-col items-center gap-2 min-w-[100px]">
              <div
                className={`w-full rounded-md ${skill.color}`}
                style={{
                  height: `${(chartHeight / topLabel) * (skill.percentage ?? 0)}px`,
                  width: '50px',
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {skill.name}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
