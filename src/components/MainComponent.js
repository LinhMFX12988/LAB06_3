import React, { Component } from "react";
import Home from "./HomeComponent";
import About from "./AboutComponent";
import Menu from "./MenuComponent";
import Contact from "./ContactComponent";
import DishDetail from './DishdetailComponent';
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { Switch, Route, Redirect } from 'react-router-dom';


class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS      
    };
  }

  render() {

    // Mục đích : Hiện thi nội dung Home page screen 
    // Truyền dữ liệu cho hàm Home 
    const HomePage = () => {
      return(
        <Home 
          dish={this.state.dishes.filter((dish) => dish.featured)[0]} //filter: tạo mảng mới chứa các phần tử có featured = true
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    }

    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        />
      );
    }
    // console.log(this.state.leaders)
    // Trả về giá trị HTML hoặc sẽ gọi đến 1 component khác 
    // Route sử dụng để định nghĩa path trong 
    // Redirect đặt mặc định trang hiển thị
    // exact path: dùng cho component cha
    // path: dùng cho component con
    return(
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/aboutus" component={() => <About leaders={this.state.leaders} />} />
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route path="/contactus" component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
