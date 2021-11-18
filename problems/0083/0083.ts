import { AbstractSolution, RunSolution } from "../../utils/solution";
import * as fs from "fs";
import { GraphNode, iGraphNode } from "@byte-this/collections";

@RunSolution
export class Solution83 extends AbstractSolution {

    getProblemName(): string {
        return "Path Sum: Four Ways";
    }

    solve() {
        return this.doSolve();
    }

    private doSolve(): number {
        const matrix = this.readFile();
        return this.findPathSum(matrix);
    }

    /**
     * Create a graph using matrix cells as node
     * Connections are determined by moves allowed
     * 
     * Each distance will correspond to a node value
     * This is an implementation of dijkstra's algorithm
     */
    private findPathSum(matrix: number[][]): number {
        //use @byte-this/collections to create node objects
        const graphNodeMatrix: iGraphNode<number>[][] = matrix.reduce((nodes, row, rowIndex, matrix) => {
            //create new nodes
            const newRow: iGraphNode<number>[] = row.map(item => new GraphNode(item));

            //connect to the surrounding nodes
            newRow.forEach((node, ind) => {
                //add right connection
                if (ind < newRow.length - 1) {
                    node.addConnectionTo(
                        newRow[ind + 1]
                    );
                    newRow[ind + 1].addConnectionTo(node);
                }
                //add up connection
                if (rowIndex > 0) {
                    node.addConnectionTo(
                        nodes[rowIndex - 1][ind]
                    );
                    nodes[rowIndex - 1][ind].addConnectionTo(node);
                }
            });

            nodes.push(newRow);

            return nodes;
        }, [] as iGraphNode<number>[][]);

        //store as 1d array
        const graphNodes = graphNodeMatrix.flat();

        const entryNode = graphNodes[0];
        const exitNode = graphNodes[graphNodes.length - 1];

        /* use Dijkstra's Algorithm to get shortest path */
        //assign distances (initialize)
        const distances = new Map<iGraphNode<number>, number>();
        distances.set(entryNode, 0);
        for (let i=1; i<graphNodes.length; i++) {
            distances.set(graphNodes[i], Infinity);
        }

        //track paths from entry node
        const nodeParents = new Map<iGraphNode<number>, iGraphNode<number>>();

        entryNode.outConnections.forEach(conn => {
            nodeParents.set(conn, entryNode);
        });

        //keep track of visited nodes
        const visitedNodes = new Set<iGraphNode<number>>();

        //helper to get next node with shortest distance
        const nextShortestNode = () => {
            let shortest = null;

            for (let [node, dist] of distances) {
                const nodeIsShortest = !shortest || dist < distances.get(shortest)!;
                if (nodeIsShortest && !visitedNodes.has(node)) {
                    shortest = node;
                }
            }

            return shortest;
        };

        let node = entryNode;

        //loop until path is complete
        while (node) {
            const distance = distances.get(node)!;

            for (let child of node.outConnections) {
                if (child !== entryNode) {
                    const plusDistance = distance + child.nodeValue;
                    const distChild = distances.get(child) || -1;

                    if (distChild > plusDistance) {
                        distances.set(child, plusDistance);
                        nodeParents.set(child, node);
                    }
                }
            }

            visitedNodes.add(node);
            node = nextShortestNode()!;

        }

        //sum up values in shortest path
        let sum = exitNode.nodeValue;
        let parent = nodeParents.get(exitNode)!;
        while (parent) {
            sum += parent.nodeValue;
            parent = nodeParents.get(parent)!;
        }

        return sum;
        
    }

    private readFile(): number[][] {
        const fileContents = fs.readFileSync(__dirname + "/matrix.txt", "utf-8");
        return fileContents.split("\r\n").map(line => {
            return line.split(",").map(item => parseInt(item));
        });
    }

}