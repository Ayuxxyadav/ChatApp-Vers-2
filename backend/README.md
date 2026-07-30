# backend\

Isse ek Radio Tower / FM Station ki tarah samjho:

Publisher (Pub): Radio Station jo gaana ya news broadcast (publish) karta hai.

Channel/Topic: Specific Frequency (jaise 93.5 FM ko aap Room ID maan sakte ho).

Subscriber (Sub): Jo log us Frequency par apna Radio set karke baithe hain (Tune in kiya hai).

Redis Pub/Sub ek fast in-memory message broker hai. Iska kaam sirf itna hota hai ki:

"Agar kisi ne Channel 'Room-101' par message daala, toh jitne bhi Servers us channel ko sun (listen/subscribe) rahe hain, sabko instant message bhej do!"


[ Frontend Client A ]           [ Frontend Client B ]
        │                               │
    (WebSocket)                     (WebSocket)
        │                               │
        ▼                               ▼
  ┌──────────────┐                ┌──────────────┐
  │   Server 1   │                │   Server 2   │
  └──────┬───────┘                └──────┬───────┘
         │                               │
         │  1. Message aaya              │ 4. Message Received
         │  2. Save to DB                │    Send to Client B
         ▼                               │
  ┌──────────────┐                       │
  │   Database   │                       │
  │ (PostgreSQL) │                       │
  └──────────────┘                       │
         │                               │
         │ 3. Publish message            │ Subscribed to 
         │    to "room-101"              │ "room-101"
         ▼                               ▼
    ┌─────────────────────────────────────────┐
    │           REDIS PUB/SUB SERVER          │
    └─────────────────────────────────────────┘





ComponentMain RoleWhy is it used?FrontendUI & Live ConnectionReact/Next.js app jo user se input leta hai aur WebSocket connection setup rakhta hai.Backend (Node/WS)State & LogicAuthenticate karta hai, active WebSockets manage karta hai, aur business logic chalata hai.Redis Pub/SubInter-Server CommunicationFast, in-memory bridge jo multiple backend servers ko aapas me baat karwane me madad karta hai.Database (Postgres)Permanent StorageChat history aur user logs maintain rakhta hai jab user offline ho ya page reload kare.