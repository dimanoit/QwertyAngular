export class FriendshipRequestStatus {
    status: Status;
    timeSent: Date;
    senderUserId: string;
    recipientUserId: string;
}

export class RequestProfile{
    request : FriendshipRequestStatus;
    name : string;
    surname : string;
    imageUrl : string;

}

enum Status {
    notSent,
    rejected,
    accepted,
    sent,
};