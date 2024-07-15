import { Global } from "@emotion/react";

const Fonts = () => (
<Global
  styles={`
    @import url('https://fonts.googleapis.com/css2?family=Prata:wght@400&display=swap');
    body {
      font-family: 'Prata', serif;
    }
  `}
/>
);

export default Fonts;
