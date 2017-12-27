import { AbstractCommandModule, FacebookId, Message } from "botyo-api";

export default class PingCommand extends AbstractCommandModule
{
    getCommand(): string
    {
        return "ping";
    }

    getDescription(): string
    {
        return "Responds to the ping, or sends a ping to a specific person";
    }

    getUsage(): string
    {
        return "[person]";
    }

    validate(msg: Message, args: string): boolean
    {
        return true;
    }

    async execute(msg: Message, args: string): Promise<any>
    {
        const runtime = this.getRuntime();
        const chatApi = runtime.getChatApi();
        const chatThreadUtils = runtime.getChatThreadUtils();

        if (args.length === 0) {
            return chatApi.sendMessage(msg.threadID, "pong! \ud83d\ude02");
        }

        const targetId = chatThreadUtils.getParticipantIdByAddressee(msg.threadID, args);
        if (targetId === undefined) {
            return chatApi.sendMessage(msg.threadID, "Literally who?");
        }

        const senderId = msg.senderID;

        const threadNamePromise = chatApi.getThreadInfo(msg.threadID)
            .then(info => info.threadName);

        const senderFullName = chatThreadUtils.getName(senderId);
        const targetFirstName = chatThreadUtils.getFirstName(targetId);

        await chatApi.sendMessage(targetId,
            `\u{1F4E2} Hey ${targetFirstName}, you received a ping!\n` +
            `\u{1F4E5} From ${senderFullName} in ${await threadNamePromise || "chat"}:\n` +
            `\u{1F517} ${PingCommand.getShortUrl(msg.threadID)}`
        );

        return chatApi.sendMessage(msg.threadID, `\u{2714}\u{FE0F} Ping to ${targetFirstName} sent!`);
    }

    static getShortUrl(id: FacebookId): string
    {
        return `https://m.me/${id}`
    }
}