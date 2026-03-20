type EntryWithVisibility = {
  data: {
    published?: boolean;
    date: Date;
    publishAt?: Date;
  };
};

export function getPublishDate<T extends EntryWithVisibility>(entry: T) {
  if (entry.data.publishAt) {
    return new Date(entry.data.publishAt);
  }

  return new Date(entry.data.date);
}

export function isPublished<T extends EntryWithVisibility>(entry: T) {
  if (entry.data.published === false) {
    return false;
  }

  return getPublishDate(entry).getTime() <= Date.now();
}

export function sortByDateDesc<T extends { data: { date: Date } }>(a: T, b: T) {
  return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
