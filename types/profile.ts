type profile = {
  firstname: string | null;
  lastname: string | null;
  userTags: {
    tag: {
      tag: string
    };
  }[];
  writer: {
    username: string;
    about: string | null;
    photo: {
      link: string;
    } | null;
    Poem: ProfilePoemType[] | null;
  }[];
};
export default profile;

export type ProfilePoemType = {
  
    title: string;
    description: string;
    background: string;
    genre: {
      genre: string;
      photo: {
        link: string;
      };
    } | null;
  
}
