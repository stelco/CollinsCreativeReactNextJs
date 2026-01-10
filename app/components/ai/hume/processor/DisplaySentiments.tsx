import React from 'react';
import { CopyBlock, dracula } from 'react-code-blocks';
import cn from "classnames";

interface DisplaySentimentsProps {
  results: any[];
}

export const DisplaySentiments: React.FC<DisplaySentimentsProps> = ({ results }) => {

  const sentimentText = results?.[0]?.results?.predictions?.[0]?.models?.language?.groupedPredictions?.[0]?.predictions?.[0]?.text || '';

  return (
    <>
    {sentimentText != '' && (

    <div className={cn("bg-gray-100 rounded-xl p-2 shadow-sm bg-grey-100 text-slate-500", "dark:bg-gray-600 dark:text-slate-100")}>

        <div className={'text-xxl ml-4 mb-4 text-orange-400 dark:text-orange-300'}>{sentimentText}</div>

          <div className="z-10 grid gap-3 lg:grid-cols-2 md:grid-cols-1 lg:flex-row mt-2 flex-grow items-start">

            <div className='code-font hidden md:block' style={{ maxHeight: '1302px', overflowY: 'scroll', msOverflowX: 'hidden' }}>

              <CopyBlock
                text={JSON.stringify(results, null, 2)}
                language='json'
                showLineNumbers={true}
                theme={dracula}
                wrapLongLines={true}
              />
            </div>

          <div>
            {results?.map((result, index) => (
              <div key={index} className="flex flex-col p-4 rounded-lg">

                <div className={'text-md'}>
                  {result.results.predictions[0].models.language.groupedPredictions[0].predictions[0].emotions.map((emotion: { name: string; score: number }, emotionIndex: number) => {
                    const fontSize = Math.min(1 + emotion.score * 2, 2); // Calculate font size based on score
                    return (
                      <div key={emotionIndex} style={{ fontSize: `${fontSize}em` }}>
                        <span className='text-slate-600 dark:text-slate-200'>{emotion.name}: </span>
                        <span className='text-orange-600 dark:text-orange-200'>{(emotion.score * 100).toFixed(2)}%</span>
                      </div>
                    );
                  })}
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

    )}
  </>
  )};
