export const COLLATERALACTIONS = [
  {
    title: 'Deposit',
    link: 'deposit',
    icon: (fill: 'white' | 'cyan') => (
      <svg
        width="37"
        height="36"
        viewBox="0 0 37 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_11899_12272)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.8403 8.50714C9.14782 8.50714 3.72247 13.9325 3.72247 20.625C3.72247 27.3175 9.14782 32.7429 15.8403 32.7429C22.5328 32.7429 27.9582 27.3175 27.9582 20.625C27.9582 13.9325 22.5328 8.50714 15.8403 8.50714ZM1.21533 20.625C1.21533 12.5478 7.76317 6 15.8403 6C23.9175 6 30.4653 12.5478 30.4653 20.625C30.4653 28.7022 23.9175 35.25 15.8403 35.25C7.76317 35.25 1.21533 28.7022 1.21533 20.625Z"
            fill={fill === 'cyan' ? '#00D1FF' : 'white'}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.3292 17.9742C14.339 17.5066 14.4725 17.3161 14.5624 17.2254C14.681 17.1058 14.9102 16.9772 15.3345 16.9097C16.2187 16.769 17.4146 16.9739 18.4015 17.2338L19.6138 17.553L20.2523 15.1286L19.04 14.8093C17.9991 14.5351 16.3722 14.2059 14.9405 14.4337C14.2069 14.5505 13.4048 14.8318 12.7817 15.4605C12.1334 16.1147 11.8215 16.9997 11.8215 18.0296V18.0771L11.8251 18.1244C11.9155 19.316 12.6245 20.108 13.3598 20.6288C14.034 21.1062 14.8697 21.4539 15.5447 21.7348C15.5702 21.7454 15.5954 21.7559 15.6204 21.7664C16.3829 22.084 16.9488 22.3286 17.341 22.6158C17.6862 22.8687 17.7207 23.0216 17.7207 23.1567C17.7207 23.6803 17.5665 23.8884 17.4457 23.9976C17.2842 24.1438 16.9807 24.2862 16.4631 24.3507C15.4087 24.482 14.039 24.2239 13.0307 23.9538L11.8198 23.6296L11.1712 26.0513L12.3821 26.3756C13.4477 26.661 15.212 27.0331 16.773 26.8386C17.5631 26.7402 18.4378 26.4808 19.1274 25.8572C19.8578 25.1967 20.2278 24.2672 20.2278 23.1567C20.2278 21.9459 19.5508 21.1267 18.8224 20.5932C18.1594 20.1076 17.3179 19.7573 16.6407 19.4754C16.6218 19.4675 16.6031 19.4597 16.5845 19.452C15.8231 19.1348 15.2348 18.8844 14.8088 18.5828C14.4476 18.3269 14.352 18.1399 14.3292 17.9742Z"
            fill={fill === 'cyan' ? '#00D1FF' : 'white'}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.8403 25.0125C16.5327 25.0125 17.0939 25.5737 17.0939 26.2661V29.4H14.5868V26.2661C14.5868 25.5737 15.148 25.0125 15.8403 25.0125Z"
            fill={fill === 'cyan' ? '#00D1FF' : 'white'}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.0939 11.85V14.9839C17.0939 15.6763 16.5327 16.2375 15.8403 16.2375C15.148 16.2375 14.5868 15.6763 14.5868 14.9839V11.85H17.0939Z"
            fill={fill === 'cyan' ? '#00D1FF' : 'white'}
          />
          <path
            d="M30.25 4.5V1.5H33.25V4.5H36.25V7.5H33.25V10.5H30.25V7.5H27.25V4.5H30.25Z"
            fill={fill === 'cyan' ? '#00D1FF' : 'white'}
          />
        </g>
        <defs>
          <clipPath id="clip0_11899_12272">
            <rect width="36" height="36" fill="white" transform="translate(0.25)" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    title: 'Remove',
    link: 'remove',
    icon: (fill: 'white' | 'cyan') => (
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.0903 2.50714C8.39782 2.50714 2.97247 7.93249 2.97247 14.625C2.97247 21.3175 8.39782 26.7429 15.0903 26.7429C21.7828 26.7429 27.2082 21.3175 27.2082 14.625C27.2082 7.93249 21.7828 2.50714 15.0903 2.50714ZM0.465332 14.625C0.465332 6.54783 7.01317 0 15.0903 0C23.1675 0 29.7153 6.54783 29.7153 14.625C29.7153 22.7022 23.1675 29.25 15.0903 29.25C7.01317 29.25 0.465332 22.7022 0.465332 14.625Z"
          fill={fill === 'cyan' ? '#00D1FF' : 'white'}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.5792 11.9742C13.589 11.5066 13.7225 11.3161 13.8124 11.2254C13.931 11.1058 14.1602 10.9772 14.5845 10.9097C15.4687 10.769 16.6646 10.9739 17.6515 11.2338L18.8638 11.553L19.5023 9.12856L18.29 8.8093C17.2491 8.53515 15.6222 8.20591 14.1905 8.43372C13.4569 8.55046 12.6548 8.83183 12.0317 9.46053C11.3834 10.1147 11.0715 10.9997 11.0715 12.0296V12.0771L11.0751 12.1244C11.1655 13.316 11.8745 14.108 12.6098 14.6288C13.284 15.1062 14.1197 15.4539 14.7947 15.7348C14.8202 15.7454 14.8454 15.7559 14.8704 15.7664C15.6329 16.084 16.1988 16.3286 16.591 16.6158C16.9362 16.8687 16.9707 17.0216 16.9707 17.1567C16.9707 17.6803 16.8165 17.8884 16.6957 17.9976C16.5342 18.1438 16.2307 18.2862 15.7131 18.3507C14.6587 18.482 13.289 18.2239 12.2807 17.9538L11.0698 17.6296L10.4212 20.0513L11.6321 20.3756C12.6977 20.661 14.462 21.0331 16.023 20.8386C16.8131 20.7402 17.6878 20.4808 18.3774 19.8572C19.1078 19.1967 19.4778 18.2672 19.4778 17.1567C19.4778 15.9459 18.8008 15.1267 18.0724 14.5932C17.4094 14.1076 16.5679 13.7573 15.8907 13.4754C15.8718 13.4675 15.8531 13.4597 15.8345 13.452C15.0731 13.1348 14.4848 12.8844 14.0588 12.5828C13.6976 12.3269 13.602 12.1399 13.5792 11.9742Z"
          fill={fill === 'cyan' ? '#00D1FF' : 'white'}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.0903 19.0125C15.7827 19.0125 16.3439 19.5737 16.3439 20.2661V23.4H13.8368V20.2661C13.8368 19.5737 14.398 19.0125 15.0903 19.0125Z"
          fill={fill === 'cyan' ? '#00D1FF' : 'white'}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.3439 5.85V8.98393C16.3439 9.67626 15.7827 10.2375 15.0903 10.2375C14.398 10.2375 13.8368 9.67626 13.8368 8.98393V5.85H16.3439Z"
          fill={fill === 'cyan' ? '#00D1FF' : 'white'}
        />
      </svg>
    ),
  },
];

export const DEBTACTIONS = [
  {
    title: 'Borrow',
    link: 'borrow',
    icon: (fill: 'white' | 'cyan') => (
      <svg
        width="37"
        height="36"
        viewBox="0 0 37 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_11899_12277)">
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M16.3403 8.50714C9.64782 8.50714 4.22247 13.9325 4.22247 20.625C4.22247 27.3175 9.64782 32.7429 16.3403 32.7429C23.0328 32.7429 28.4582 27.3175 28.4582 20.625C28.4582 13.9325 23.0328 8.50714 16.3403 8.50714ZM1.71533 20.625C1.71533 12.5478 8.26317 6 16.3403 6C24.4175 6 30.9653 12.5478 30.9653 20.625C30.9653 28.7022 24.4175 35.25 16.3403 35.25C8.26317 35.25 1.71533 28.7022 1.71533 20.625Z"
            fill={fill === 'cyan' ? '#00D1FF' : 'white'}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.8292 17.9742C14.839 17.5066 14.9725 17.3161 15.0624 17.2254C15.181 17.1058 15.4102 16.9772 15.8345 16.9097C16.7187 16.769 17.9146 16.9739 18.9015 17.2338L20.1138 17.553L20.7523 15.1286L19.54 14.8093C18.4991 14.5351 16.8722 14.2059 15.4405 14.4337C14.7069 14.5505 13.9048 14.8318 13.2817 15.4605C12.6334 16.1147 12.3215 16.9997 12.3215 18.0296V18.0771L12.3251 18.1244C12.4155 19.316 13.1245 20.108 13.8598 20.6288C14.534 21.1062 15.3697 21.4539 16.0447 21.7348C16.0702 21.7454 16.0954 21.7559 16.1204 21.7664C16.8829 22.084 17.4488 22.3286 17.841 22.6158C18.1862 22.8687 18.2207 23.0216 18.2207 23.1567C18.2207 23.6803 18.0665 23.8884 17.9457 23.9976C17.7842 24.1438 17.4807 24.2862 16.9631 24.3507C15.9087 24.482 14.539 24.2239 13.5307 23.9538L12.3198 23.6296L11.6712 26.0513L12.8821 26.3756C13.9477 26.661 15.712 27.0331 17.273 26.8386C18.0631 26.7402 18.9378 26.4808 19.6274 25.8572C20.3578 25.1967 20.7278 24.2672 20.7278 23.1567C20.7278 21.9459 20.0508 21.1267 19.3224 20.5932C18.6594 20.1076 17.8179 19.7573 17.1407 19.4754C17.1218 19.4675 17.1031 19.4597 17.0845 19.452C16.3231 19.1348 15.7348 18.8844 15.3088 18.5828C14.9476 18.3269 14.852 18.1399 14.8292 17.9742Z"
            fill={fill === 'cyan' ? '#00D1FF' : 'white'}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.3403 25.0125C17.0327 25.0125 17.5939 25.5737 17.5939 26.2661V29.4H15.0868V26.2661C15.0868 25.5737 15.648 25.0125 16.3403 25.0125Z"
            fill={fill === 'cyan' ? '#00D1FF' : 'white'}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.5939 11.85V14.9839C17.5939 15.6763 17.0327 16.2375 16.3403 16.2375C15.648 16.2375 15.0868 15.6763 15.0868 14.9839V11.85H17.5939Z"
            fill={fill === 'cyan' ? '#00D1FF' : 'white'}
          />
          <path
            d="M30.75 4.5H33.75H36.75V7.5H33.75H30.75H27.75V4.5H30.75Z"
            fill={fill === 'cyan' ? '#00D1FF' : 'white'}
          />
        </g>
        <defs>
          <clipPath id="clip0_11899_12277">
            <rect width="36" height="36" fill="white" transform="translate(0.75)" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    title: 'Claim Proft',
    link: 'claim',
    icon: (fill: 'white' | 'cyan') => (
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.0903 2.50714C8.39782 2.50714 2.97247 7.93249 2.97247 14.625C2.97247 21.3175 8.39782 26.7429 15.0903 26.7429C21.7828 26.7429 27.2082 21.3175 27.2082 14.625C27.2082 7.93249 21.7828 2.50714 15.0903 2.50714ZM0.465332 14.625C0.465332 6.54783 7.01317 0 15.0903 0C23.1675 0 29.7153 6.54783 29.7153 14.625C29.7153 22.7022 23.1675 29.25 15.0903 29.25C7.01317 29.25 0.465332 22.7022 0.465332 14.625Z"
          fill={fill === 'cyan' ? '#00D1FF' : 'white'}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.5792 11.9742C13.589 11.5066 13.7225 11.3161 13.8124 11.2254C13.931 11.1058 14.1602 10.9772 14.5845 10.9097C15.4687 10.769 16.6646 10.9739 17.6515 11.2338L18.8638 11.553L19.5023 9.12856L18.29 8.8093C17.2491 8.53515 15.6222 8.20591 14.1905 8.43372C13.4569 8.55046 12.6548 8.83183 12.0317 9.46053C11.3834 10.1147 11.0715 10.9997 11.0715 12.0296V12.0771L11.0751 12.1244C11.1655 13.316 11.8745 14.108 12.6098 14.6288C13.284 15.1062 14.1197 15.4539 14.7947 15.7348C14.8202 15.7454 14.8454 15.7559 14.8704 15.7664C15.6329 16.084 16.1988 16.3286 16.591 16.6158C16.9362 16.8687 16.9707 17.0216 16.9707 17.1567C16.9707 17.6803 16.8165 17.8884 16.6957 17.9976C16.5342 18.1438 16.2307 18.2862 15.7131 18.3507C14.6587 18.482 13.289 18.2239 12.2807 17.9538L11.0698 17.6296L10.4212 20.0513L11.6321 20.3756C12.6977 20.661 14.462 21.0331 16.023 20.8386C16.8131 20.7402 17.6878 20.4808 18.3774 19.8572C19.1078 19.1967 19.4778 18.2672 19.4778 17.1567C19.4778 15.9459 18.8008 15.1267 18.0724 14.5932C17.4094 14.1076 16.5679 13.7573 15.8907 13.4754C15.8718 13.4675 15.8531 13.4597 15.8345 13.452C15.0731 13.1348 14.4848 12.8844 14.0588 12.5828C13.6976 12.3269 13.602 12.1399 13.5792 11.9742Z"
          fill={fill === 'cyan' ? '#00D1FF' : 'white'}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.0903 19.0125C15.7827 19.0125 16.3439 19.5737 16.3439 20.2661V23.4H13.8368V20.2661C13.8368 19.5737 14.398 19.0125 15.0903 19.0125Z"
          fill={fill === 'cyan' ? '#00D1FF' : 'white'}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.3439 5.85V8.98393C16.3439 9.67626 15.7827 10.2375 15.0903 10.2375C14.398 10.2375 13.8368 9.67626 13.8368 8.98393V5.85H16.3439Z"
          fill={fill === 'cyan' ? '#00D1FF' : 'white'}
        />
      </svg>
    ),
  },
  {
    title: 'Repay',
    link: 'repay',
    icon: (fill: 'white' | 'cyan') => (
      <svg
        width="25"
        height="30"
        viewBox="0 0 25 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.9463 16.9468C11.9371 16.9568 11.863 17.0366 11.8554 17.3212C11.8648 17.3758 11.9002 17.4529 12.0696 17.5823C12.312 17.7675 12.657 17.928 13.1614 18.1546L13.2086 18.1758C13.6422 18.3704 14.223 18.6311 14.6861 18.997C15.2145 19.4144 15.6947 20.0514 15.6947 20.9695C15.6947 21.7802 15.445 22.494 14.9076 23.0182C14.594 23.3242 14.2295 23.519 13.8648 23.6413V24.2407C13.8648 24.862 13.3611 25.3657 12.7398 25.3657C12.1185 25.3657 11.6148 24.862 11.6148 24.2407V23.7711C11.0554 23.6949 10.5461 23.5668 10.1775 23.4603C9.58059 23.2879 9.23649 22.6642 9.40893 22.0673C9.58137 21.4704 10.2051 21.1263 10.802 21.2987C11.4507 21.4861 12.28 21.6479 12.8862 21.5664C13.1746 21.5277 13.2943 21.4487 13.3365 21.4076C13.3548 21.3898 13.4447 21.3023 13.4447 20.9695L13.4449 20.9629C13.4463 20.935 13.4485 20.8867 13.2913 20.7624C13.0725 20.5896 12.7445 20.434 12.2393 20.207L12.1813 20.181C11.7482 19.9867 11.1727 19.7285 10.7038 19.3702C10.1747 18.9661 9.67105 18.3522 9.6075 17.4484L9.60473 17.409V17.3695C9.60473 16.6186 9.81462 15.9414 10.2899 15.4241C10.6765 15.0033 11.1571 14.7777 11.6148 14.6617V14.4907C11.6148 13.8694 12.1185 13.3657 12.7398 13.3657C13.3611 13.3657 13.8648 13.8694 13.8648 14.4907V14.6746C14.185 14.7357 14.4751 14.81 14.7122 14.8774C15.3098 15.0472 15.6567 15.6693 15.4869 16.267C15.3171 16.8646 14.695 17.2115 14.0973 17.0417C13.462 16.8612 12.7516 16.7388 12.2625 16.8227C12.0406 16.8608 11.9663 16.9251 11.9463 16.9468Z"
          fill={fill === 'cyan' ? '#00D1FF' : 'white'}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.07654 0.705161C6.75677 0.70214 6.44155 0.78162 6.16136 0.936004C5.87813 1.09206 5.64049 1.31926 5.47187 1.59518C5.30325 1.8711 5.20948 2.18622 5.19981 2.50945C5.19014 2.83267 5.2649 3.15284 5.41672 3.43835L5.48953 3.57526L7.43875 5.61515C7.36642 5.67057 7.29723 5.73071 7.23167 5.79536C6.81902 6.20228 6.58316 6.7553 6.57511 7.33477L6.57483 7.35487L6.57527 7.37496C6.57946 7.56688 6.60834 7.75674 6.66068 7.94001C5.01621 9.23912 3.64911 10.8604 2.64552 12.7084C1.47605 14.8618 0.833458 17.2617 0.770392 19.7113L0.77002 19.7258V19.7402C0.77002 23.0186 2.1089 25.4731 4.3285 27.0682C6.49716 28.6266 9.40436 29.2952 12.485 29.2952C15.5657 29.2952 18.4794 28.6267 20.6548 27.0694C22.8814 25.4756 24.23 23.0214 24.23 19.7402V19.7245L24.2296 19.7088C24.1611 17.2549 23.511 14.8523 22.333 12.6986C21.3378 10.8793 19.9899 9.28153 18.3721 7.99658C18.4356 7.78989 18.4688 7.5743 18.47 7.35656L18.47 7.34572L18.4699 7.33488C18.462 6.76067 18.2303 6.2122 17.8243 5.80613C17.7503 5.73217 17.6716 5.664 17.5889 5.60191L19.5386 3.56158L19.6152 3.40534C19.7541 3.12204 19.8192 2.80827 19.8046 2.4931C19.7899 2.17793 19.696 1.87155 19.5315 1.60232C19.367 1.3331 19.1372 1.10975 18.8634 0.952957C18.5896 0.796163 18.2806 0.710995 17.9652 0.705342L7.07654 0.705161ZM8.00906 2.95516L10.1161 5.16016H14.899L17.006 2.95516H8.00906ZM8.72745 9.55528C8.58321 9.55718 8.43997 9.54421 8.29987 9.51703C6.78473 10.6577 5.53001 12.1116 4.62275 13.7822C3.62526 15.6189 3.07611 17.6654 3.02003 19.7546C3.02379 22.3334 4.03911 24.0895 5.64154 25.2411C7.29788 26.4313 9.68568 27.0452 12.485 27.0452C15.2844 27.0452 17.6807 26.4313 19.3452 25.2398C20.9554 24.0872 21.9759 22.3312 21.98 19.7559C21.9191 17.6634 21.3636 15.6151 20.359 13.7784C19.4457 12.1088 18.1849 10.6574 16.6642 9.52074C16.5314 9.54476 16.396 9.55648 16.2597 9.5554L16.2521 9.55533L16.2147 9.55525H15.1164L15.5125 10.3954C15.7774 10.9574 15.5366 11.6278 14.9746 11.8928C14.4126 12.1577 13.7423 11.9169 13.4773 11.3549L12.6289 9.55525H12.3709L11.5225 11.3549C11.2576 11.9169 10.5872 12.1577 10.0252 11.8928C9.46318 11.6278 9.22237 10.9574 9.48731 10.3954L9.88341 9.55525H8.77705L8.76989 9.5554L8.765 9.55525L8.72745 9.55528Z"
          fill={fill === 'cyan' ? '#00D1FF' : 'white'}
        />
      </svg>
    ),
  },
];
