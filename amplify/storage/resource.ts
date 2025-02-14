import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
    name: "bucket",
    access: (allow) => ({
      "Pdf_storage/*": [
        //allow.guest.to(["read", "write", "delete"]),
        allow.authenticated.to(['read','write','delete'])
      ],
    }),
  });
  