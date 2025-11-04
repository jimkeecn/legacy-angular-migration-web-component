import { Component, OnInit } from "@angular/core";
import { UserService, User } from "../services/user.service";

@Component({
  selector: "app-user-management-wrapper",
  template: `
    <div class="wrapper-container">
      <app-user-management [users]="users"></app-user-management>
    </div>
  `,
  styles: [
    `
      .wrapper-container {
        width: 100%;
      }
    `,
  ],
})
export class UserManagementWrapperComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers() {
    this.users = this.userService.getAllUsers();
  }
}
