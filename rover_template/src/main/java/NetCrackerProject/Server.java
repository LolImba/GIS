package NetCrackerProject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.sql.*;
import java.util.Scanner;

public class Server {
    public static void main(String[] args) throws IOException {
        while (true) {
            try(ServerSocket ss = new ServerSocket(8189);
                Socket clientSocket = ss.accept()) {
                System.out.printf("new client: %s\n",clientSocket.getRemoteSocketAddress());
                PrintWriter writer = new PrintWriter(clientSocket.getOutputStream());
                writer.println("hello");
                BufferedReader br = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
//                String url = br.readLine();
//                System.out.println(url);
                int numberOfPoints = br.read();
                String points = br.readLine();
                System.out.println(points);
                Scanner sc = new Scanner(points);
                String[] outPoints = new String[numberOfPoints];
                String arrPoints = "";
                for (int i = 0; i < numberOfPoints; i++) {
                    String next = sc.next();
                    arrPoints += "point=" + next + "&";
                    outPoints[i] = next;
                }
                String url = "https://graphhopper.com/api/1/matrix?"
                        + arrPoints + "type=json&vehicle=car&debug=true&out_array=distances&key=5324449a-9018-4d52-856b-ae60f13cc242";
                TSPAlgorithm algorithm = new TSPAlgorithm();
                String string = algorithm.tsp(url);
                Scanner str = new Scanner(string);
                int[] path = new int[numberOfPoints];
                int pathLength = algorithm.getPathlenght();
//                writer.println(pathLength);
                String pointsForDB = "";
                for (int i = 0; i < path.length; i++) {
                    path[i] = Integer.parseInt(str.next());
                    writer.println(outPoints[path[i]]);
                    pointsForDB += outPoints[path[i]] + "\n";
                }
                writer.println(outPoints[path[0]]);
                pointsForDB += outPoints[path[0]] + "\n";
                writer.println("Path length = " + pathLength);
                writer.flush();
                Server server = new Server();
                server.sendInfoToDB(pointsForDB,path,pathLength);

            }catch (Exception ex) {
                //Logger.getLogger(TCPServer.class.getName()).log(Level.SEVERE, null, ex);
                ex.printStackTrace();
            }

        }
    }
    void addObjectToDB(PreparedStatement preparedStatement, String objName, String objDesc,
                       ObjEnum objEnum, int parentId, boolean activeFlag) throws Exception{
        preparedStatement.setString(1, objName);
        preparedStatement.setString(2, objDesc);
        preparedStatement.setString(3, objEnum.name());
        preparedStatement.setInt(4, parentId);
        preparedStatement.setBoolean(5, activeFlag);
        preparedStatement.execute();
    }

    void addAttributeToDB(PreparedStatement preparedStatement, String name, String type,
                          int mask, boolean activeFlag) throws Exception{
        preparedStatement.setString(1, name);
        preparedStatement.setString(2, type);
        preparedStatement.setInt(3, mask);
        preparedStatement.setBoolean(4, activeFlag);
        preparedStatement.execute();
    }

    void addObjAttributeToDB(PreparedStatement preparedStatement, int objID,
                             int attrID, String value) throws Exception{
        preparedStatement.setInt(1, objID);
        preparedStatement.setInt(2, attrID);
        preparedStatement.setString(3, value);
        preparedStatement.execute();
    }

    void addRouteToDB(PreparedStatement preparedStatement, Date date, String name,
                      String type, boolean activateFlag) throws Exception {
        preparedStatement.setDate(1, date);
        preparedStatement.setString(2, name);
        preparedStatement.setString(3, type);
        preparedStatement.setBoolean(4, activateFlag);
        preparedStatement.execute();
    }

    void addRoutePointToDB(PreparedStatement preparedStatement, int routeID,
                           int pointID, Date pointDate, Time pointTime) throws Exception{
        preparedStatement.setInt(1, routeID);
        preparedStatement.setInt(2, pointID);
        preparedStatement.setDate(3, pointDate);
        preparedStatement.setTime(4, pointTime);
        preparedStatement.execute();
    }



    static void sendInfoToDB(String points, int[] path, int pathLength) throws Exception {
        String userName = "root";
        String password = "sergey342535";
        String connectionURL = "jdbc:mysql://localhost:3306/netcrackerbase?serverTimezone=UTC&useSSL=false";
        try(Connection connection = DriverManager.getConnection(connectionURL, userName, password);
            Statement statement = connection.createStatement();
            Scanner scanner = new Scanner(points)) {
            String route = "";
            PreparedStatement preparedStatement= connection.prepareStatement(
                    "Insert into results(route, LengthRoute)" +
                    " values (?, ?)");
            preparedStatement.setString(1, points);
            preparedStatement.setInt(2,pathLength);
            preparedStatement.execute();
            preparedStatement = connection.prepareStatement(
                    "Insert into points(PosX, PosY) values (?, ?)");
            for (int i = 0; i < path.length; i++) {
                route += path[i];
                String[] positions = scanner.nextLine().split(",");
                System.out.println(positions[0]);
                double posX = Double.parseDouble(positions[0]);
                double posY = Double.parseDouble(positions[1]);
                preparedStatement.setDouble(1,posX);
                preparedStatement.setDouble(2,posY);
                preparedStatement.execute();
            }
        }
    }
}
