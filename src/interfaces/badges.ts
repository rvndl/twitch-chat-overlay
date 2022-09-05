export interface Badges {
  badge_sets: {
    [key: string]: {
      versions: {
        [key: string]: {
          image_url_1x: string;
        };
      };
    };
  };
}
