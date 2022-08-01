import { Maybe } from '../../api/generatedTypes';
import {
  DropdownOption,
  topics as canonicalTopics,
  topics,
} from './definitions';
import { ScheduleSummary } from '../components';

/**
 * This function transforms topic names as recorded in the database
 * into more easily readable names, e.g. `TECHNOLOGY` -> `Technology`
 * or `HEALTH_FITNESS` -> `Health & Fitness`.
 *
 * Returns `N/A` if there is no topic match from the known list of topics.
 */
export const getDisplayTopic = (
  topicCode: Maybe<string> | string | undefined
): string => {
  const displayTopic = topics.find((topic) => {
    return topic.code === topicCode;
  })?.name;

  return displayTopic ? displayTopic : 'N/A';
};

/**
 * Extracts a summary of topic data from scheduled corpus item data.
 *
 * @param data
 */
export const getGroupedTopicData = (data: string[]): ScheduleSummary[] => {
  const topics: ScheduleSummary[] = [];

  data.forEach((topic) => {
    const existingEntry = topics.find((entry) => entry.name === topic);

    existingEntry
      ? (existingEntry.count += 1)
      : topics.push({ name: topic, count: 1 });
  });

  // Add the rest of the pre-defined topics - we need to list them all,
  // but only if there's anything actually scheduled for the day.
  if (data.length > 0) {
    canonicalTopics.forEach((topic: DropdownOption) => {
      const topicExists = topics.find((entry) => entry.name === topic.name);

      if (!topicExists) {
        topics.push({ name: topic.name, count: 0 });
      }
    });
  }

  // Sort topics in descending order - most frequent on top
  // And do a secondary sort within topics with equal counts
  // to list them in alphabetical order
  topics.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  return topics;
};
