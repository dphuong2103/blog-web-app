import { Tag } from "@/models/type";

export function sortShownTagsByCount(shownTagIds: string[], tags: Tag[]) {
  const tagsWithCount = tags.map((tag) => {
    const count = shownTagIds.reduce((total, x) => {
      if (x === tag.id) {
        return total + 1;
      }
      return total;
    }, 0);
    return {
      tag,
      count,
    };
  });
  return tagsWithCount
    .filter((x) => x.count > 0)
    .sort((a, b) => b.count - a.count);
}

export function sortTagsByCount(tags: Tag[]) {
  const tagCounts = tags.reduce(
    (accum, currentTag) => {
      const tag = accum[currentTag.id];
      if (tag) {
        return {
          ...accum,
          [currentTag.id]: {
            tag: tag.tag,
            count: tag.count + 1,
          },
        };
      } else {
        return {
          ...accum,
          [currentTag.id]: {
            tag: currentTag,
            count: 1,
          },
        };
      }
    },
    {} as Record<
      string,
      {
        tag: Tag;
        count: number;
      }
    >,
  );
  return Object.keys(tagCounts)
    .map((tagId) => {
      return { tag: tagCounts[tagId].tag, count: tagCounts[tagId].count };
    })
    .sort((a, b) => b.count - a.count);
}
