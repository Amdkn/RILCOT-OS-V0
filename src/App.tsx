import Roadmap from './Roadmap';

const App = () => {
  return (
    <Router>
      <Nav>
        <NavItem isActive={/* Update isActive logic here */}>Home</NavItem>
        <NavItem isActive={/* Update isActive logic here */}>About</NavItem>
        <NavItem isActive={/* Update isActive logic here */}>Roadmap</NavItem>
      </Nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/roadmap" component={Roadmap} />
      </Switch>
    </Router>
  );
};

export default App;