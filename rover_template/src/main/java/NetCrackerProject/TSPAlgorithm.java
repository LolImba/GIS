package NetCrackerProject;

import java.io.IOException;
import java.util.Stack;

public class TSPAlgorithm
{
    private int numberOfNodes;
    private Stack<Integer> stack;
    private int pathlenght = 0;

    public TSPAlgorithm()
    {
        stack = new Stack<Integer>();
    }

    public String tsp(String adress) throws IOException {
        int[][] matrix =
                TSPParser.parse(adress);
        numberOfNodes = matrix[1].length - 1;
        int result[] = new int[numberOfNodes + 1];
        result[0] = 0;
        int[] visited = new int[numberOfNodes + 1];
        visited[0] = 1;
        stack.push(0);
        int element, dst = 0, i, lastIndex = 0;
        int min = Integer.MAX_VALUE;
        boolean minFlag = false;
        String s = "0 ";
        System.out.print(0 + "\t");

        while (!stack.isEmpty()) {
            element = stack.peek();
            i = 0;
            int subIndex = 0;
            min = Integer.MAX_VALUE;
            while (i <= numberOfNodes) {
                if (matrix[element][i] > 0 && visited[i] == 0)
                {
                    if (min > matrix[element][i])
                    {
                        min = matrix[element][i];
                        dst = i;
                        minFlag = true;
                    }
                }
                i++;
            }
            if (minFlag) {
                visited[dst] = 1;
                stack.push(dst);
                pathlenght += min;
//                System.out.print(dst + "\t");
                minFlag = false;
                lastIndex = dst;
                subIndex++;
                result[subIndex] = dst;
                System.out.print(result[subIndex] + "\t");
                s += result[subIndex] + " ";
                continue;
            }
            stack.pop();
        }
        pathlenght += matrix[lastIndex][0];
        System.out.println(s);
        System.out.println("min = " + pathlenght);
        return s;
    }

    public int getPathlenght() {
        return pathlenght;
    }
}