import Game from "@/components/wonder-pick/game";
import { getWonderPickResponseFromSeed } from "@/utils/wonder-pick";
import { notFound } from "next/navigation";

export default async function Home(props: { params: Promise<{ seed: string }> }) {
  const params = await props.params;
    const seed = params.seed;
    try {
      const wonderPickResponse = getWonderPickResponseFromSeed(seed);

      return (
        <Game seedResponse={wonderPickResponse} />
      );

    } catch (error) {
      console.error(error);
      notFound();
    }
}
