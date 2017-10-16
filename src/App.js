import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Panel, Col} from "react-bootstrap"
import logo from './logo.svg';
import './App.css';

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// using some little inline style helpers to make the app look okay
const grid = 8;
const getItemStyle = (draggableStyle, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  marginBottom: grid,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = isDraggingOver => ({
  background:  'lightblue',
  padding: grid,
  width: 250,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items1: getItems(10),
      items2: getItems(10),
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  //Reordena a lista depois de "soltar" o item
  onDragEnd(result) {
    // Quando é solto fora da lista e sem destino
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items2,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items2:items,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React DND teste</h2>
        </div>
          <Col md={12}>
          <Panel header="Tabelas" bsStyle="primary" style={{marginTop:15}}>
          <DragDropContext onDragEnd={this.onDragEnd}>

          <Col md={4}>
            <Droppable droppableId="itens1">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {this.state.items1.map(item => (
                    <Draggable key={item.id} draggableId={item.id}>
                      {(provided, snapshot) => (
                        <div>
                          <div
                            ref={provided.innerRef}
                            style={getItemStyle(
                              provided.draggableStyle,
                              snapshot.isDragging
                            )}
                            {...provided.dragHandleProps}
                          >
                            {item.content}
                          </div>
                          {provided.placeholder}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Col>

          <Col md={4}>
            <Droppable droppableId="itens2">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {this.state.items2.map(item => (
                    <Draggable key={item.id} draggableId={item.id}>
                      {(provided, snapshot) => (
                        <div>
                          <div
                            ref={provided.innerRef}
                            style={getItemStyle(
                              provided.draggableStyle,
                              snapshot.isDragging
                            )}
                            {...provided.dragHandleProps}
                          >
                            {item.content}
                          </div>
                          {provided.placeholder}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Col>

          </DragDropContext>
        </Panel>
      </Col>
      </div>
    );
  }
}

export default App;
