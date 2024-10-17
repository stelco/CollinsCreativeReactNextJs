import { generateYAxisSkills } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { exo2 } from '@/app/ui/fonts';
import skills from '@/app/portfolio/skills';

export default async function SkillsChart() {

  const chartHeight = 350;

    // Filter filteredSkills to only include those with a defined percentage
    const filteredSkills = skills.filter(skill => skill.percentage !== undefined);

  const { yAxisLabels, topLabel } = generateYAxisSkills(filteredSkills);

  if (!filteredSkills || filteredSkills.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
    }

  return (
    <div className="w-full md:col-span-4">

      <h2 className={`${exo2.className} mb-4 text-xl md:text-2xl`}>
        Skills Chart
      </h2>

      {
        <div className="rounded-xl bg-gray-100 p-4">

          <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
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
                    width: '30px',
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
      }
    </div>
  );
}
