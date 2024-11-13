import { generateYAxisSkills } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { exo2 } from '@/app/ui/fonts';
import skills from '@/app/portfolio/data/skills';
import cn from "classnames";

export default async function SkillsChart() {

  const chartHeight = 440;

  // Filter filteredSkills to only include those with a defined percentage
  const filteredSkills = skills.filter(skill => skill.percentage !== undefined);

  const { yAxisLabels, topLabel } = generateYAxisSkills(filteredSkills);

  if (!filteredSkills || filteredSkills.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className={cn("w-full md:col-span-4 bg-gray-100 rounded-xl p-2 shadow-sm text-slate-500", "dark:bg-gray-600 dark:text-slate-100")}>

      <h2 className={`${exo2.className} mb-4 mt-2 ml-4 text-xl md:text-2xl`}>
        Skills Chart
      </h2>

      {
        <div className={cn("w-full md:col-span-4 bg-gray-100 text-slate-500", "dark:bg-gray-600 dark:text-slate-100")}>

          <div
            className={cn("flex items-end gap-2 rounded-xl bg-white p-4 md:gap-4","dark:bg-gray-700")}
            style={{ overflowX: 'auto' }}
            >
            <div
              className="mb-8 flex flex-col justify-between text-sm text-gray-400"
              style={{ height: `${chartHeight}px` }}
            >
              {yAxisLabels.map((label) => (
                <p key={label}>{label}</p>
              ))}
            </div>

            {filteredSkills.map((skill) => (
              <div key={skill.name} className="flex flex-col items-center gap-2 pb-8 min-w-[80px]">
                <div
                  className={`w-full rounded-md ${skill.color}`}
                  style={{
                    height: `${(chartHeight / topLabel) * (skill.percentage ?? 0)}px`,
                    width: '20px',
                  }}
                ></div>
                <p className="-rotate-90 text-sm text-gray-400 sm:rotate-90 mt-8">
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