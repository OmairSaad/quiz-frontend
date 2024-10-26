import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { adminGuard } from './admin.guard';
import { userGuard } from './user.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoriesComponent } from './pages/admin/add-categories/add-categories.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { PreQuizComponent } from './pages/user/pre-quiz/pre-quiz.component';
import { StartQuizComponent } from './pages/user/start-quiz/start-quiz.component';
import { AttemptedQuizComponent } from './pages/user/attempted-quiz/attempted-quiz.component';
import { ShowAttemptedQuizComponent } from './pages/user/show-attempted-quiz/show-attempted-quiz.component';
import { preventbackGuard } from './preventback.guard';
import { CangePasswordComponent } from './pages/user/cange-password/cange-password.component';

export const routes: Routes = [
    {path:"sign", component:RegisterComponent},
    {path:"login", component:LoginComponent},
    {path:'home', component:HomeComponent},
    {path:'', redirectTo:"/home",pathMatch:'full'},
    {
        path:'admin', 
        component:DashboardComponent, 
        canActivate:[adminGuard],
        children:[
            {
                path:'',
                component:WelcomeComponent
            },
            {
                path:"profile",
                component:ProfileComponent
            },
            {
                path:"categories",
                component:ViewCategoriesComponent
            },
            {
                path:'add-category',
                component:AddCategoriesComponent
            },
            {
                path:'quizzes',
                component:ViewQuizzesComponent
            },
            {
                path:"add-quiz",
                component:AddQuizComponent
            },
            {
                path:"quizzes/:quizId",
                component:UpdateQuizComponent
            },
            {
                path:"questions/:quizId/:title",
                component:ViewQuizQuestionsComponent
            },
            {
                path:"add-question/:quizId/:title",
                component:AddQuestionComponent
            },
            {
                path:"question/:quesId/:title",
                component:UpdateQuestionComponent
            }
        ]
    },
    {
        path:'user-dashboard', 
        component:UserDashboardComponent, 
        canActivate:[userGuard],
        children:[
            {
                path:":catId",
                component:LoadQuizComponent
            },
            {
                path:"",
                redirectTo:"/user-dashboard/all",
                pathMatch:"full"
            },
            {
                path:"about-quiz/:quizId",
                component:PreQuizComponent
            },
            {
                path:"quiz/attempted-quiz",
                component:AttemptedQuizComponent
            },
            {
                path:"quiz/attempted-quiz/:attemptId",
                component:ShowAttemptedQuizComponent
            },
        ]
    },
    {
        path:"start-quiz/:quizId",
        component:StartQuizComponent,
        canDeactivate:[preventbackGuard],
        canActivate:[userGuard]
    },
    
        {
            path:"change-password",
            component:CangePasswordComponent
        }
    
];
