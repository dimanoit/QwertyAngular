export class Message{
     IdSender : string;
     TextMessage : string;
     IdRecipient : string;
     DateAndTimeMessage : Date;
}

export class Sms{
     Message : Message;
     Name : string;
     Surname : string;
     ImageUrl : string;
}