import * as React from 'react';
export * from './assets/images';
interface Props {
    text: string;
}
export declare const ExampleComponent: ({ text }: Props) => React.JSX.Element;
export { default as AuthUtils } from "./utils/authUtils";
export { default as commonUtils } from "./utils/commonUtils";
