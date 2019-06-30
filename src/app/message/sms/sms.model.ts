export class Message{
     idMessage : number;
     idSender : string;
     textMessage : string;
     idRecipient : string;
     dateAndTimeMessage : Date;
     isSelected : boolean;
}

export class Sms{
     message : Message;
     name : string;
     surname : string;
     imageUrl : string;
}