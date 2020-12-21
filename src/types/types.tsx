// normally, these would be split into different files - but no point for an app this small

export interface RepoListResponseInterface {
  search: {
    repositoryCount: number;
    edges: RepoInterface[];
  }
}

export interface RepoInterface {
  node: {
    description: string;
    updatedAt: string;
    forkCount: number;
    isArchived: boolean;
    isFork: boolean;
    isMirror: boolean;
    licenseInfo: LicenseInfoInterface;
    owner: OwnerInterface;
    id: string;
    name: string;
    primaryLanguage: PrimaryLanguageInterface;
    stargazerCount: number;
    viewerHasStarred: false;
  }
}

interface PrimaryLanguageInterface {
  name: string;
}

interface LicenseInfoInterface {
  name: string;
}

interface OwnerInterface {
  url: string;
}

export interface AddStarResponseInterface {
  addStar: {
    starrable: {
      viewerHasStarred: boolean;
    }
  }
}

export interface RemoveStarResponseInterface {
  removeStar: {
    starrable: {
      viewerHasStarred: boolean;
    }
  }
}