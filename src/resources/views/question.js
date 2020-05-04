import { inject } from 'aurelia-framework';
import { BasicView } from './BasicView';
import { PostService } from '../services/PostService';
import { DialogHandler } from '../utils/dialog/DialogHandler';
import PerfectScrollbar from 'perfect-scrollbar';
import { SessionHandler } from '../utils/SessionHandler';
import { PostTypeEnum } from '../utils/PostTypeEnum';

@inject(PostService, DialogHandler, SessionHandler, PostTypeEnum)
export class Question extends BasicView {


  answers = [];

  constructor(postService, dialogHandler, sessionHandler, postTypeEnum, ...rest) {
    super(...rest);
    this.postService = postService;
    this.dialogHandler = dialogHandler;
    this.sessionHandler = sessionHandler;
    this.postTypeEnum = postTypeEnum;
  }

  attached() {
    this.answers.posts = [];
    this.answers.totalPages = undefined;
    this.answers.page = undefined;
    this.scrollActive = true;

    const container = document.querySelector('.larger-container');
    let ps = new PerfectScrollbar(container);

    this.scrollBar = ps;

    this.scrollBar.update();
  }
  activate(params) {
    this.findQuestionById(params.question);

  }

  findQuestionById(id) {
    this.postService.findById(id).then(question => {
      this.question = question;
      let avatarNames = this.question.user.name.split(" ");
      this.question.user.avatarName = avatarNames[0].substring(0, 1);
      console.log(this.question);
      this.findAllAnswers();
    });
  }

  findAllAnswers() {
    if (this.answers.totalPages > 0 && this.answers.page < this.answers.totalPages) {

      this.postService.findAllAnswers(this.question.id, this.answers.page + 1, 4)
        .then((answers) => {
          this.answers.posts = this.answers.posts.concat(answers.posts);
          this.answers.page = answers.page;
          this.answers.totalPages = answers.totalPages;
          this.updateNames(this.answers);

          if (this.answers.totalPages > 0 && this.answers.page == this.answers.totalPages) {
            this.scrollActive = false;
          }
          this.scrollBar.update();

          console.log(this.answers);
        });


    } else if (this.answers.totalPages == undefined) {
      this.postService.findAllAnswers(this.question.id, 0, 4)
        .then((answers) => {
          this.answers.posts = answers.posts;
          this.answers.page = answers.page;
          this.answers.totalPages = answers.totalPages;
          this.updateNames(this.answers);
          if (this.answers.totalPages > 0 && this.answers.page == this.answers.totalPages) {
            this.scrollActive = false;
          }
          this.scrollBar.update();
          console.log(this.answers);
        });

    } else if (this.answers.totalPages > 0 && this.answers.page == this.answers.totalPages) {
      this.scrollActive = false;
      this.scrollBar.update();
    }
  }

  updateNames(answers) {
    answers.posts.forEach(answer => {
      let avatarNames = answer.user.name.split(" ");
      answer.user.avatarName = avatarNames[0].substring(0, 1);
    });

  }

  async onClickAnswer() {
    let loggedUser = this.sessionHandler.getUser();

    if (!loggedUser) {
      let params = {
        "title": this.I18N.tr("user.modal.title"),
        "inputLabel": this.I18N.tr("user.modal.inputLabel"),
        "size": "200",
        "button": this.I18N.tr("user.modal.button"),
        "buttonImage": this.I18N.tr("user.modal.buttonImage")
      };

      let nome = await this.dialogHandler.openDialog(DialogHandler.MODAL_DEFAULT, params, false, false, 'sm');
      if (nome && nome.value != '') {
        this.sessionHandler.loginSaveSession(nome.value);
        loggedUser = nome.value;
      } else {
        await this.dialogHandler.showAlert(this.I18N.tr("user.modal.empty"), 'error');
      }
    }

    if (loggedUser) {
      let params = {
        modal: {
          title: this.I18N.tr("post.modal.answer.title") + this.question.user.name,
          inputTitle: this.I18N.tr("post.modal.answer.inputTitle"),
          inputDescription: this.I18N.tr("post.modal.answer.inputDescription"),
          buttonSave: this.I18N.tr("post.modal.answer.buttonSave"),
          buttonClean: this.I18N.tr("post.modal.answer.buttonClean")
        },
        user: loggedUser,
        postType: this.postTypeEnum.type.ANSWER
      }
      this.dialogHandler.openDialog(DialogHandler.MODAL_POST, params, false, true).then((newPost) => {
        if (newPost)
          newPost.postType = this.postTypeEnum.type.ANSWER;
        newPost.questionId = this.question.id;
        this.createNewAnswer(newPost);
      });

    }
  }

  createNewAnswer(newQuestion) {
    this.postService.create(newQuestion).then(() => {
      this.answers.posts = [];
      this.answers.totalPages = undefined;
      this.answers.page = undefined;
      this.findAllAnswers()
    }
    ).catch(err => {
      this.dialogHandler.showAlert(err.message, 'error');
    });
  }

  backToForum() {
    this.router.navigateToRoute('index');
  }


  upVote(answer){    

    let updateQuestion = {
      "id": answer.id,
      "title": answer.title,
      "description": answer.description,
      "user": {
          "id": answer.user.id
      },
      "creationDate": answer.creationDate,
      "postType": this.postTypeEnum.type.ANSWER,
      "questionId" : this.question.id,
      "upVote": {
        "name" : this.sessionHandler.loggedUser
      }
  }

    this.postService.update(updateQuestion).then(() => {
      this.answers.posts = [];
      this.answers.totalPages = undefined;
      this.answers.page = undefined;
      this.findAllAnswers();
    }
    ).catch(err => {
     this.dialogHandler.showAlert(err.message, 'error');
    });
  }
}
