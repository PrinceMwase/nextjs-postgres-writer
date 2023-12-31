export type userDefinitions = {
  firstname: string | null;
  lastname: string | null;
  userTags: {
    tag: {
      id: number
      tag: string
    };
  }[] | null;
}

export type Writer = {
  id: number,
  username: string;
  about: string | null;
  photo: {
    link: string;
  } | null;
  Poem: ProfilePoemType[] | null;
};

interface profile extends userDefinitions {
  writer: Writer[];
};
export default profile;

export type ProfilePoemType = {
  
    title: string;
    description: string | null;
    background: string;
    genre: {
      genre: string;
      photo: {
        link: string;
      };
    } | null;
  
}
