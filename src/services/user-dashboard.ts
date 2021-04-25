import { Activity, CompletedActivity } from '@prisma/client';

export function mergeActivities(
  challengeActivities: Activity[],
  userCompletedActivities: CompletedActivity[]
) {
  return challengeActivities.map((challengeActivity) => {
    let completedActivity = userCompletedActivities.find(
      (userActivity) => userActivity.activityId === challengeActivity.id
    );

    return {
      id: challengeActivity.id,
      name: challengeActivity.name,
      date: completedActivity?.date,
      evidence: completedActivity?.evidence,
      state: completedActivity?.state,
    };
  });
}
