interface IMetaProps {
  title?: string;
  name?: string;
}

interface IRedirectProps {
  to: string | object;
  from: string;
  push?: boolean;
  exact?: boolean;
  strict?: boolean;
}

interface IRouteConfigProps {
  path: string;
  component: any;
  children?: any;
  exact?: boolean;
  meta?: IMetaProps;
  redirect?: IRedirectProps;
  redirectUrl?: string;
  computedMatch?: any;
  [propName: string]: any;
}

interface IChildrenRouteProps {
  childrenRoutes?: Array<IRouteConfigProps>;
}

export interface IRouteProps extends IRouteConfigProps, IChildrenRouteProps {}
