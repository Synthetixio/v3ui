import { Icon, IconProps } from '@chakra-ui/react';

export const XIcon = ({ ...props }: IconProps) => {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <g clipPath="url(#clip0_14230_11024)">
        <path
          d="M10.573 13.5844L4.98887 20.25H6.31212L11.1608 14.4623L15.0334 20.25H19.5L13.6438 11.498L19.5 4.50809H18.1767L13.0564 10.6201L8.9666 4.50809H4.5L10.5733 13.5844H10.573ZM12.3854 11.4209L12.9788 12.2924L17.6999 19.227H15.6673L11.8573 13.6306L11.264 12.7591L6.3115 5.48454H8.34405L12.3854 11.4206V11.4209Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_14230_11024">
          <rect width="15" height="15.75" fill="white" transform="matrix(-1 0 0 -1 19.5 20.25)" />
        </clipPath>
      </defs>
    </Icon>
  );
};
