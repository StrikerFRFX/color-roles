import { client } from "..";

export default async function () {
	client.user!.setActivity("for slash commands! || Playing with rainbows!", {
		type: "WATCHING"
	});
}
