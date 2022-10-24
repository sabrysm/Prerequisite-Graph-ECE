class Graph {
  edges = [];

  // to add an Edge
  addEdge = (firstNode, secondNode) => {
    var source = firstNode;
    var destination = secondNode;
    this.edges.push([source, destination]);
  };

  neighbours = (node) => {
    const nodeNeighbours = { neighbours: [], prevReq: [], opens: [] };
    for (let edge of this.edges) {
      if (node === edge[1] && node === edge[0]) {
        console.log(node);
      }
      if (node === edge[0]) {
        nodeNeighbours.neighbours.push(edge[1]);
        nodeNeighbours.prevReq.push(edge[1]);
      }
      if (node === edge[1]) {
        nodeNeighbours.opens.push(edge[0]);
      }
    }
    return nodeNeighbours;
  };
}
const HelperFunction = (G, node) => {
  if (node === "") {
    return;
  }
  const checked = [];
  const stack = { path: [], prevReq: [], opens: [] };
  const dfs = (G, node) => {
    checked.push(node);
    // console.log(G.neighbours(node));
    for (let neighbour of G.neighbours(node).neighbours) {
      if (!checked.includes(neighbour)) {
        dfs(G, neighbour);
      }
    }
    stack.path.push(node);
  };

  dfs(G, node);
  return stack;
};

export class topologicalSort {
  constructor(course) {
    this.course = course;
    this.graph = new Graph();
    this.graph.addEdge("EMP 012", "EMP 011");
    this.graph.addEdge("EMP 219", "EMP 012");
    this.graph.addEdge("EMP 113", "EMP 012");
    this.graph.addEdge("EMP 114", "EMP 012");
    this.graph.addEdge("EMP 022", "EMP 021");
    this.graph.addEdge("STR x19", "EMP 021");
    this.graph.addEdge("STR 123", "EMP 022");
    this.graph.addEdge("EMP 042", "EMP 041");
    this.graph.addEdge("EEP 112", "EEP 111");
    this.graph.addEdge("EEC 211", "EEP 111");
    this.graph.addEdge("EEP 131", "EEP 111");
    this.graph.addEdge("EEC 211", "EMP 114");
    this.graph.addEdge("EEC 261", "EMP 114");
    this.graph.addEdge("EEC 271", "EMP 114");
    this.graph.addEdge("EEC 242", "EEC 141");
    this.graph.addEdge("EEC 243", "EEC 242");
    this.graph.addEdge("EEC 341", "EEC 243");
    this.graph.addEdge("EEC 232", "EEC 131");
    this.graph.addEdge("EEC 332", "EEC 232");
    this.graph.addEdge("EEC 381", "EMP 214");
    this.graph.addEdge("EEC 361", "EEC 261");
    this.graph.addEdge("EEC 471", "EEC 211");
    this.graph.addEdge("EEC 371", "EEC 271");
    this.graph.addEdge("EEC 381", "EEC 271");
    this.graph.addEdge("EEC 233", "EEC 131");
    this.graph.addEdge("EEC 332", "EEC 233");
    this.graph.addEdge("EEC 361", "EMP 219");
    this.graph.addEdge("EEC 471", "EMP 219");
    this.graph.addEdge("EEC 461", "EEC 361");
    this.graph.addEdge("EEC 362", "EEC 361");
    this.graph.addEdge("EEC 382", "EEC 381");
    this.graph.addEdge("EEC 402", "EEC 401");
    this.graph.addEdge("EEC 481", "EEC 382");
    this.graph.addEdge("EEC 483", "EEC 481");
    this.graph.addEdge("EEC 484", "EEC 481");
    this.graph.addEdge("EEC 401", "115 Credit Hours");
    this.res = HelperFunction(this.graph, course);
    console.log(this.res.path);
    this.dict = {};
    if (this.res.path) {
      this.res.path.forEach((r) => {
        this.dict[r] = r.substring(4, r.length - 1);
      });
    }

    // Step - 1
    // Create the array of key-value pairs
    this.items = Object.keys(this.dict).map((key) => {
      return [key, this.dict[key]];
    });

    // Step - 2
    // Sort the array based on the second element (i.e. the value)
    this.items.sort((first, second) => {
      return first[1] - second[1];
    });

    // Step - 3
    // Obtain the list of keys in sorted order of the values.
    this.keys = this.items.map((e) => {
      return e[0];
    });
    this.course = {
      path: this.keys,
      prevReq: this.graph.neighbours(course).prevReq,
      opens: this.graph.neighbours(course).opens,
    };
    return this.course;
  }
}
