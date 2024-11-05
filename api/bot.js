const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
});

const ask = async (question) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a wise, philosophical thinker. Respond to all messages in a philosophical way." },
                { role: "user", content: question }
            ],
        });
        const answer = response.choices[0].message.content;
        console.log(answer);

        return answer;
    } catch (error) {
        console.error("Error with OpenAI API: ", error)
        throw error
    }

};


module.exports = ask;