export type Monster = {
  monster_id: string;
  name: string;
  another_name: string;
  category: string;
  title: string[];
  image_url: string;
  ranking: {
    ranking: number;
    vote_year: string;
  }[];
};

export type MonsterListProps = {
  total: number;
  monsters: Monster[];
};
