import Debug "mo:base/Debug";
import Text "mo:base/Text";
import LlmCanister "mo:llm";

actor HoaxVerifier {

  public shared func checkNews(newsText : Text) : async Text {
    let prompt = "Saya memiliki berita berikut:\n\n" # newsText # "\n\n" #
    "Tolong analisis berita ini dan tentukan apakah ini hoax atau fakta berdasarkan sumber terpercaya dan pola hoax yang umum.\n" #
    "Berikan output dalam format berikut:\n\n" #
    "1. **Kesimpulan:** (Apakah berita ini HOAX atau FAKTA?)\n" #
    "2. **Alasan:** (Jelaskan mengapa berita ini dianggap hoax atau fakta, berdasarkan sumber atau pola berita yang digunakan)\n" #
    "3. **Tingkat Kepercayaan:** (Persentase kemungkinan hoax atau fakta, misalnya 90% HOAX atau 85% FAKTA)\n" #
    "4. **Diagram atau Visualisasi:**\n" #
    "   - Jika memungkinkan, buatlah dalam format JSON yang bisa diterjemahkan menjadi grafik.\n" #
    "   - Contoh output JSON untuk visualisasi:\n" #
    "   ```json\n" #
    "   {\n" #
    "     \"status\": \"HOAX\",\n" #
    "     \"confidence\": 90,\n" #
    "     \"evidence\": {\n" #
    "       \"clickbait\": 85,\n" #
    "       \"source_unreliable\": 70,\n" #
    "       \"manipulated_images\": 95\n" #
    "     }\n" #
    "   }\n" #
    "   ```\n" #
    "   - Jika bisa, sertakan analisis singkat dalam bentuk tabel atau diagram teks.\n\n" #
    "Gunakan analisis berbasis model AI terbaru untuk mendapatkan hasil yang akurat.";

    let result = await LlmCanister.prompt(#Llama3_1_8B, prompt);
    return result;
  };
};