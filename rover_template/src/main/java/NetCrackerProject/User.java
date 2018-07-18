package NetCrackerProject;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.util.Scanner;

public class User {
    public static void main(String[] args) throws Exception {
        int numberOfPoints;
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter the number of points ");
        numberOfPoints = scanner.nextInt();
        int [] route = new int [numberOfPoints];
        String arrPoints = "";
//        String points = "";
        System.out.println("Enter the points ");
        for (int i = 0; i < numberOfPoints; i++){
            String next = scanner.next();
            arrPoints += next + " ";
//            points += "point=" + next + "&";
        }
//        String url = "https://graphhopper.com/api/1/matrix?"
//                + points + "type=json&vehicle=car&debug=true&out_array=distances&key=5324449a-9018-4d52-856b-ae60f13cc242";
        getPoints(numberOfPoints, arrPoints);
        }
    private static void getPoints(int numberOfPoints, String arrPoints) throws Exception {
        try (Socket socket = new Socket()) {
            socket.connect(new InetSocketAddress(InetAddress.getLocalHost(), 8189));
            Scanner sc = new Scanner(socket.getInputStream());
            PrintWriter printWriter = new PrintWriter(socket.getOutputStream());
//            printWriter.println(url);
            printWriter.write(numberOfPoints);
            printWriter.flush();
            printWriter.println(arrPoints);
            printWriter.flush();
            Thread.sleep(1000);
            while (sc.hasNextLine()) {
                System.out.println(sc.nextLine());
            }
        }
    }

}
