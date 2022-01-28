import * as yup from 'yup';
import { CuratedStatus } from '../../../api/generatedTypes';
import { languages, topics } from '../../helpers/definitions';

const languageCodes = languages.map((l) => l.code);
const topicCodes = topics.map((t) => t.code);

export const validationSchema = yup.object({
  title: yup.string().trim().min(2, 'Please enter at least two characters.'),
  url: yup.string().trim().min(2, 'Please enter at least two characters.'),
  language: yup.mixed().oneOf(languageCodes),
  status: yup.mixed<CuratedStatus>().oneOf(Object.values(CuratedStatus)),
  topic: yup.mixed().oneOf(topicCodes),
});
