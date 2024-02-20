import User from "@/models/User";
import { connectToDB } from "@/mongodb";

export const POST = async (req, res) => {
  try {
    await connectToDB();

    const body = await req.json();

    const { name } = body;

    const existingUser = await User.findOne({ name });


    if (existingUser) {
      return new Response(JSON.stringify("User already exists"), {
        status: 400,
      });
    }


    const newUser = await User.create({
     name,
      
    });

    await newUser.save();

    return new Response(JSON.stringify(newUser), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify("Failed to create a new user"), {
      status: 500,
    });
  }
};
