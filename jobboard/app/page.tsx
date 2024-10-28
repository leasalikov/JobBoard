
import HomePage from "./(page)/home/page";
import {NextUIProvider} from '@nextui-org/react'

export default function Home() {
  return (
    <NextUIProvider>
      <HomePage/>
    </NextUIProvider>
  );
}
