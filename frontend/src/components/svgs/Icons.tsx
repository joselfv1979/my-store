type Props = {
  width: string;
};

export const HomeIcon = ({ width }: Props) => (
  <svg width={width} fill="currentColor" viewBox="0 0 20 20">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
  </svg>
);

export const MinusCircleIcon = () => (
  <svg width="1rem" fill="currentColor" viewBox="0 0 20 20">
    <path
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
      clipRule="evenodd"
      fillRule="evenodd"
    ></path>
  </svg>
);

export const MinusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width=".7rem"
    height=".7rem"
    viewBox="0 0 24 24"
  >
    <path d="M0 10h24v4h-24z" />
  </svg>
);

export const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width=".7rem"
    height=".8rem"
    viewBox="0 0 24 24"
  >
    <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
  </svg>
);

export const PlusCircleIcon = ({ width }: Props) => (
  <svg width={width} fill="currentColor" viewBox="0 0 20 20">
    <path
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
      clipRule="evenodd"
      fillRule="evenodd"
    ></path>
  </svg>
);

export const CloseIcon = () => (
  <svg
    height="1.3rem"
    id="Layer_1"
    version="1.1"
    viewBox="0 0 512 512"
    width="1.3rem"
  >
    <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
  </svg>
);

export const LogoutIcon = ({ width }: Props) => (
  <svg fill="#fff" width={width} viewBox="0 0 512 512">
    <path d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"></path>
  </svg>
);

export const CartIcon = () => (
  <svg
    width="1rem"
    aria-hidden="true"
    fill="black"
    focusable="false"
    viewBox="0 0 576 512"
  >
    <path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path>
  </svg>
);

export const TrashIcon = () => (
  <svg width="1rem" fill="currentColor" viewBox="0 0 20 20">
    <path
      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
      clipRule="evenodd"
      fillRule="evenodd"
    ></path>
  </svg>
);

export const GitHubIcon = ({ width }: Props) => (
  <svg width={width} viewBox="0 0 16 16" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
    ></path>
  </svg>
);

export const LensIcon = () => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    className="DocSearch-Search-Icon"
  >
    <path
      d="M 14.386 14.386 l 4.0877 4.0877 l -4.0877 -4.0877 c -2.9418 2.9419 -7.7115 2.9419 -10.6533 0 c -2.9419 -2.9418 -2.9419 -7.7115 0 -10.6533 c 2.9418 -2.9419 7.7115 -2.9419 10.6533 0 c 2.9419 2.9418 2.9419 7.7115 0 10.6533 Z"
      stroke="currentColor"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);
