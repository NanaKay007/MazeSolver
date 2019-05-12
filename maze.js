let maze,result;

function init (){
    let map = [
    ['s','p','w','p','p','w','p'],
    ['p','w','p','p','p','w','p'],
    ['p','p','p','w','p','w','w'],
    ['w','p','w','p','p','p','p'],
    ['w','p','w','p','p','w','f'],
  ]
  maze = new Maze(map);
//   TestGetNeighbors(maze);
  
}

function run(){
    result = BFS(maze);
    animate(result);
}

function animate(position){
let path = new Stack();
let current = position;
//put path in right order: from start to finish
while(current!= null){
    path.push(current);
    current = current.previous;
}

setInterval(()=>{
    if(path.size != 0){
        let current = path.peek();
        //set current element with blue color
        var obj = document.getElementById(`box${current.data.xposition}${current.data.yposition}`);
        obj.style.background = 'blue';

        //set previous element to white color
        let previous = current.data.previous;
        try{
        var prev_obj = document.getElementById(`box${previous.data.xposition}${previous.data.yposition}`);
        prev_obj.style.background = 'white';
        console.log(prev_obj);
        } catch{
            //do nothing
        }

    // obj.style.background = 'white';
    path.pop();
    } else {
        alert('done! :)');
        return;
    }
},500);

}

class Maze{
constructor(data){
    this.map = [];
    this.start;
    this.loadMaze(data);
}

loadMaze(data){
    
    data.forEach((row,y) => {
        console.log('running')
        var container = document.createElement('div');
        container.id = `row${y}`;
        container.style.display = 'flex';
        container.style.flexDirection = 'row';
        container.style.justifyContent = 'center';
        document.body.appendChild(container);

    row.forEach(
        (positionType,x)=>{
        let position = new Position(x,y);
        if(positionType == 'w'){
            position.setWall();
        } else if(positionType == 'f'){
            position.setAsFinish();
        } else if (positionType == 's'){
            this.setStart(position);
            position.setCurrent();
        } else if(positionType != 'p'){
            throw "invalid position type";
        }
        this.map.push(position);
        position.draw();
        }
    );
    });
    console.log('done')
}

getNeighbors(position){
    let neighbors = [];

    //get neighbors only if position is not a wall
    if(!position.getIsWall()){
    this.map.forEach(positionItem =>{
        //directly up
        if(!positionItem.getIsWall()){
        if(position.getY()-1 >= 0 && positionItem.getY() == position.getY()-1 && position.getX() == positionItem.getX()){
            neighbors.push(positionItem);
        }
        //directly below
        if(positionItem.getY() == position.getY()+1 && positionItem.getX() == position.getX()){
            neighbors.push(positionItem);
        }
        //to the right
        if(position.getX()+1 == positionItem.getX() && positionItem.getY() == position.getY()){
            neighbors.push(positionItem);
        }
        //to the left
        if(position.getX()-1 == positionItem.getX() && position.getX()-1 >= 0 && positionItem.getY() == position.getY()){
            neighbors.push(positionItem);
        }
        }
        
    })
    return neighbors;
    } else {
    throw "this function works for only non-wall positions";
    }
}

getPositions(){
    return this.map;
}

setStart(position){
    this.start = position;
}
}

class Position{
constructor(x,y){
    this.xposition = x;
    this.yposition = y;
    this.previous = null;
    this.isWall = false;
    this.isCurrent = false;
    this.isVisited = false;
    this.isFinish = false;
}

draw(){
    var elmnt = document.createElement("div");
    // elmnt.style.position = "absolute";
    elmnt.style.marginTop = this.yposition*1000;
    elmnt.style.marginBottom = this.xposition*1000;
    elmnt.id = `box${this.xposition}${this.yposition}`;
    elmnt.style.width = '100px';
    elmnt.style.height = '100px';
    let color;
    elmnt.style.border = `0.5px solid black`;
    
    
    if(this.isWall){
    color = 'black';
    }
    else if(this.isCurrent){
    color = 'blue';
    } else if(!this.isCurrent && !this.isWall) {
    color = 'white';
    
    } 
    if(this.isFinish == true){
    color = 'green';
    }
    elmnt.style.backgroundColor = color;
    var container = document.getElementById(`row${this.yposition}`);
    container.appendChild(elmnt);
    
}

//setters
setVisited(){
    this.isVisited = true;
}

setCurrent(){
    this.isCurrent = true;
}

setPrevious(position){
    this.previous = position;
}

setWall(){
    this.isWall = true;
}

unsetCurrent(){
    this.isCurrent = false;
}

setAsFinish(){
    this.isFinish = true;
}

//getters
getIsWall(){
    return this.isWall;
}

getPrevious(){
    return this.previous;
}

getIsVisited(){
    return this.isVisited;
}

getIsFinish(){
    return this.isFinish;
}

getX(){
    return this.xposition;
}

getY(){
    return this.yposition;
}
}

class Node{
constructor(data,next = null){
    this.data = data;
    this.next = next;
}
}

class LinkedList{
constructor(){
this.head = null;
this.tail = null;
this.size = 0;
}

isEmpty(){
if(this.size == 0){
    return true;
}
return false;
}

insertFirst(data){
let new_node = new Node(data);
new_node.next = this.head;
this.head = new_node;
if(this.size == 0){
    this.tail = new_node;
}
this.size++;
}

insertLast(data){
let new_node = new Node(data);
if(this.tail != null){
    this.tail.next = new_node; 
} 
if(this.size == 0){
    this.head = new_node;
}
this.tail = new_node;
this.size++;
}

pop_back(){
let value = this.tail.data;
let count = 0;
let current = this.head;
while(count != this.size - 1){
    current = current.next;
    count++;
}
this.tail = current;
this.size--;
return value;
}

pop_front(){
let value = this.head.data;
this.head = this.head.next;
this.size--;
return value;
}
}

function LinkedListTests(){
function makeList(){
    let List = new LinkedList();
    return List;
}

function TestInsertLastAndSize(){
    list = makeList();
    list.insertLast(5);
    list.insertLast(4);
    list.insertLast(3);
    list.insertLast(2);
    list.insertLast(1);
    console.log(list.size);
}

function TestInsertFirstAndPopfront(){
    list = makeList();
    list.insertFirst(1);
    list.insertFirst(2);
    list.insertFirst(3);
    console.log(list);
    while(!list.isEmpty()){
    console.log(list.pop_front(),list.size);
    }

}

function TestBothInserts(){
    console.log("in TestBothInserts");
    list = makeList();
    list.insertLast(5);
    list.insertLast(6);
    list.insertLast(7);
    list.insertLast(8);
    list.insertFirst(4);
    list.insertFirst(3);
    list.insertFirst(2);
    list.insertFirst(1);
    
    while(!list.isEmpty()){
    console.log(list.pop_front(),list.size);
    }
}

//call tests
TestInsertLastAndSize();
TestInsertFirstAndPopfront();
TestBothInserts();
}

class Stack extends LinkedList{

constructor(){
    super();
}

push(data){
    this.insertFirst(data);
}

pop(){
    let value = this.pop_front();
    return value;
}

peek(){
    return this.head;
}
}

class Queue extends LinkedList{
constructor(){
    super();
}

enqueue(data){
    this.insertLast(data);
}

dequeue(){
    let value = this.pop_back();
    return value;
}
}

function StackTests(){
function makeStack(){
    stack = new Stack();
    return stack;
}

function pushAndGetSize(){
    stack = makeStack();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.push(5);
    while(stack.size != 0){
    console.log(stack.pop());
    }
    console.log(stack.size);
}


//calls tests
pushAndGetSize();
}

function QueueTests(){
    function makeQueue(){
        let list = new Queue();
        return list;
    }
    function EnqueDeqeue(){
        var Queue = makeQueue();
        Queue.enqueue(1);
        Queue.dequeue();
        console.log(Queue.size);
    }

    EnqueDeqeue();
}


function BFS(maze){

let start = maze.start;
let frontier = new Queue();

frontier.enqueue(start);
start.setVisited();

while(frontier.size != 0){
    
    let current = frontier.dequeue();
    if(current.getIsFinish()){
        return current;
    }
    let neighbors = maze.getNeighbors(current);
    neighbors.forEach(neighbor => {
    if(neighbor.getIsVisited() == false){
        neighbor.setVisited();
        neighbor.setPrevious(current);
        frontier.enqueue(neighbor);
    }
    })
}
alert("cannot be solved") ;
return;

}

function TestGetNeighbors(maze){
    var positions = maze.getPositions();
    positions.forEach((position)=>{
        if(!position.getIsWall()){
            let neighbors = maze.getNeighbors(position);
            console.log(position,neighbors)
        }
        
    });
}

// QueueTests();


