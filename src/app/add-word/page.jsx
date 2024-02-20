import { connectToDB } from "@/mongodb";
import Word from "@/models/Word";
import { revalidatePath } from "next/cache"


const AddWordPage = async () => {
    const words = await Word.find({});
    
    const addWord = async (formData) => {
        "use server"
       
        const word = formData.get("word");
        const hint = formData.get("hint");
        await connectToDB();
        const existingWord = await Word.findOne({
            word,
        });
        if (existingWord) {
            return console.log("Word already exists");
        }
        const newWord = await Word.create({
            word,
            hint,
        });
        await newWord.save();
        revalidatePath("/add-word");
        return newWord;
    }


 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div>
      <h1>Add Word</h1>
      <form action={addWord} >
        <label>
          Word:
          <input type="text" name="word"  />
        </label>
        <br />
        <label>
          Hint:
          <input type="text" name="hint"  />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
    <ul>
        {words.map((word) => (
            <li key={word._id}>
                {word.word} - {word.hint}
            </li>
        ))}
    </ul>
    
    </main>
  );
};

export default AddWordPage;
