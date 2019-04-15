export class FriendshipRequestStatus {
    Status: Status;
    TimeSent: Date;
    SenderUserId: string;
    RecipientUserId: string;
}

export class RequestProfile{
    Request : FriendshipRequestStatus;
    Name : string;
    Surname : string;
    ImageUrl : string;

}

enum Status {
    NotSent,
    Rejected,
    Accepted,
    Sent,
};