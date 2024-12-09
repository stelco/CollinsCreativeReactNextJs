
import { NextApiRequest, NextApiResponse } from 'next';
import { Hume, HumeClient } from 'hume';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.HUME_API_KEY;
if (!apiKey) {
  throw new Error("HUME_API_KEY is not defined in the environment variables");
}

const humeClient = new HumeClient({
  apiKey: String(apiKey),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { text } = req.body;

    const language: Hume.expressionMeasurement.Bcp47Tag = 'en';
    const languageModelConfig: Hume.expressionMeasurement.Language = {
      granularity: Hume.expressionMeasurement.Granularity.Sentence,
      identifySpeakers: false,
    };

    const jobConfig: Hume.expressionMeasurement.InferenceBaseRequest = {
      text: [text],
      models: { language: languageModelConfig },
      transcription: { language },
    };

    try {
      const job = await humeClient.expressionMeasurement.batch.startInferenceJob(jobConfig);
      await job.awaitCompletion();
      const jobResults = await humeClient.expressionMeasurement.batch.getJobPredictions(job.jobId);
      res.status(200).json(jobResults);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get job predictions' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}