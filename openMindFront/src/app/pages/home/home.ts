import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from "../../components/navbar/navbar";

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
