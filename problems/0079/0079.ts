import { AbstractSolution, RunSolution } from "../../utils/solution";
import * as fs from "fs";
import { Graph, GraphNode, iGraphNode } from "@byte-this/collections";

@RunSolution
export class Solution79 extends AbstractSolution {

    getProblemName(): string {
        return "Passcode Derivation";
    }

    protected solve() {
        return this.doSolve();
    }

    private doSolve(): string {
        const loginAttempts = this.readLoginAttempts();
        return this.determineShortestPassword(loginAttempts);
    }

    /**
     * Use a graph structure to keep track of which chars appear after the others
     * The shortest path between the char with no incomming connections
     *      and the char with no outgoing connection is the shortest password
     * @param loginAttempts 
     * @returns 
     */
    private determineShortestPassword(loginAttempts: string[][]): string {

        //we'll use a graph to represent chars
        //children will be chars which come after a value
        const graph = new Graph<string>();
        const valuesFound = new Set<string>();

        //filter out chars which can't be the first char of the passcode
        const nonFirstNodes = new Set<string>();

        //create graph nodes and connections
        loginAttempts.forEach(chars => {

            const prevChars: iGraphNode<string>[] = [];

            chars.forEach((char, index) => {
                if (index > 0) {
                    nonFirstNodes.add(char);
                }

                let node: iGraphNode<string>;
                if (valuesFound.has(char)) {
                    node = graph.findNodes(node => node.nodeValue === char)[0]!;
                } else {
                    node = new GraphNode(char);
                    graph.addNode(node);
                    valuesFound.add(char);
                }

                prevChars.forEach(prev => prev.addConnectionTo(node));

                prevChars.push(node);
            });
        });

        //find the minimum path
        //we know start node has 0 incoming connections
        //and end node has 0 outgoing connections
        const lastNode = graph.findNodes(node => node.outConnections.length === 0)[0];
        const firstNode = graph.findNodes(node => !nonFirstNodes.has(node.nodeValue))[0];

        const passwords = firstNode.getPathsToNode(lastNode);
        const validPassword = passwords.find(pword => pword.length === valuesFound.size);
        
        return validPassword!.map(pword => pword.nodeValue).join("");

    }

    /**
     * Synchronously read the file and get an array of array of chars
     * This would be faster if we read char by char, but implementing this way for simplicity
     */
    private readLoginAttempts(): string[][] {
        const fileContents = fs.readFileSync(__dirname + "/keylog.txt", "utf-8");
        return fileContents.split("\r\n").map(line => Array.from(line));
    }

}