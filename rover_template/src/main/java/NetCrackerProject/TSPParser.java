package NetCrackerProject;

import javax.json.*;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class TSPParser {
    static int[][] parse(String adress) throws IOException {
    URL url = new URL(adress);
    try(InputStream is = url.openStream()){
        JsonReader rdr = Json.createReader(is);
        JsonObject obj = rdr.readObject();
        JsonArray results = obj.getJsonArray("distances");
        int matrixSize = results.size();
        int[][] out = new int[matrixSize][matrixSize];
        for (int i = 0; i < matrixSize; i++) {
            JsonArray arr = (JsonArray)results.get(i);
            for(int j = 0; j < matrixSize; j++){
                    out[i][j] = arr.getInt(j);
                    System.out.println(out[i][j]);
//
         }
            System.out.println("-----------");
        }
        return out;
    }
}
}
