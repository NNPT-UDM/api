const { Options } = require("../../configs/app.configs.js");
const { render, redirect, renderErrorPage } = require("../../base/router.base");
const { QuizServices } = require("../../api/services/quiz.services");
const { UserModel } = require("../../models/user.models");
const { ProductServices } = require("../../api/services/product.services.js");
const { CourseServices } = require("../../api/services/course.services.js");
const { RoleModel } = require("../../models/role.models.js");
const { SkillModel } = require("../../models/skill.models.js");
const { LessonModel } = require("../../models/lesson.models.js");
const { DiagnosticModel } = require("../../models/diagnostic.models.js");
const has = Object.prototype.hasOwnProperty;

class PageController {
  async defaultPage(req, res, next) {
    const { user } = req.session;
    if (user) {
      redirect({ response: res, path: `/page/${user.role}/home` });
    } else {
      redirect({ response: res, path: "/auth/login" });
    }
  }
  async profilePage(req, res, next) {
    const user = await UserModel.findOne({
      _id: req.params.id || req.query._id || undefined,
    });
    render({
      response: res,
      title: req.i18n_texts.Dashboard,
      view: "HR/contacts-profile",
      data: { userInfo: user },
    });
  }
  async starterPage(req, res, next) {
    render({
      response: res,
      title: req.i18n_texts.Dashboard,
      view: "Pages/pages-starter",
    });
  }
  async homePage(req, res, next) {
    render({
      response: res,
      title: req.i18n_texts.Dashboard,
      view: "Dashboard/index",
    });
  }

  async calendarPage(req, res, next) {
    render({
      response: res,
      title: req.i18n_texts.Calendar,
      view: "Calendar/calendar",
    });
  }

  async chatPage(req, res, next) {
    render({
      response: res,
      title: req.i18n_texts.Calendar,
      view: "Chat/chat",
    });
  }
  async userListPage(req, res, next) {
    try {
      const roles = await RoleModel.find(req.query).sort("index");
      const listCourse = await CourseServices.view({}, Options.FILTER);
      const visible = roles.map((role, index) => {
        return `or[0][${index}][role]=${role._id}`;
      });
      const pending = ["activated=false", visible.join("&")].join("&");
      render({
        response: res,
        title: req.i18n_texts.User_List,
        view: "HR/human-management",
        data: {
          roles: roles,
          pending: pending,
          listCourse: listCourse,
        },
      });
    } catch (error) {
      console.log(error);
      renderErrorPage({
        response: res,
        title: "Internal Server Error",
        statusCode: error.statusCode || 500,
      });
    }
  }
  async classDetail(req, res, next) {
    const { id } = req.params;
    const skills = await SkillModel.find();
    try {
      render({
        response: res,
        title: req.i18n_texts.User_List,
        view: "Classrooms/classroom-detail",
        data: {
          classroomId: id,
          skills: skills,
        },
      });
    } catch (error) {
      console.log(error);
      renderErrorPage({
        response: res,
        title: "Internal Server Error",
        statusCode: error.statusCode || 500,
      });
    }
  }
  async classworkListByIdPage(req, res, next) {
    const { id } = req.params;

    try {
      render({
        response: res,
        title: req.i18n_texts.User_List,
        view: "Classwork/classwork-datatables",
        data: {
          classroomId: id,
        },
      });
    } catch (error) {
      console.log(error);
      renderErrorPage({
        response: res,
        title: "Internal Server Error",
        statusCode: error.statusCode || 500,
      });
    }
  }
  async classworkPage(req, res, next) {
    const { id, classroomId } = req.params;
    try {
      render({
        response: res,
        title: req.i18n_texts.User_List,
        view: "Classworks/classwork-detail",
        data: {
          classworkId: id,
          classroomId: classroomId,
        },
      });
    } catch (error) {
      console.log(error);
      renderErrorPage({
        response: res,
        title: "Internal Server Error",
        statusCode: error.statusCode || 500,
      });
    }
  }
  async myClassrooms(req, res, next) {
    try {
      render({
        response: res,
        title: req.i18n_texts.User_List,
        view: "Classrooms/assigned-classroom-datatables",
      });
    } catch (error) {
      console.log(error);
      renderErrorPage({
        response: res,
        title: "Internal Server Error",
        statusCode: error.statusCode || 500,
      });
    }
  }

  async userGridPage(req, res, next) {
    try {
      const users = await UserModel.find().populate("role", "name slug _id");
      render({
        response: res,
        title: req.i18n_texts.User_Grid,
        view: "HR/contacts-human",
        data: { users: users },
      });
    } catch (error) {
      renderErrorPage({
        response: res,
        title: "Internal Server Error",
        statusCode: error.statusCode || 500,
      });
    }
  }

  async userProfilePage(req, res, next) {
    render({
      response: res,
      title: req.i18n_texts.Profile,
      view: "HR/contacts-profile",
    });
  }
  async quizDetail(req, res, next) {
    const { id } = req.params;
    const quiz = await QuizServices.view({ _id: id }, Options.DETAIL);
    render({
      response: res,
      title: "Quiz",
      view: "Quizzes/quiz-detail",
      data: { quizInfo: quiz },
    });
  }
  async quizList(req, res, next) {
    try {
      const skills = await SkillModel.find();
      render({
        response: res,
        title: "Quiz",
        view: "Quizzes/quiz-datatables",
        data: { skills: skills },
      });
    } catch (error) {
      renderErrorPage({
        response: res,
        title: "Internal Server Error",
        statusCode: error.statusCode || 500,
      });
    }
  }
  async diagnoseList(req, res, next) {
    const skills = await SkillModel.find();
    try {
      render({
        response: res,
        title: "Diagnoses",
        view: "Diagnoses/diagnose-list-datatables",
        data: { skills: skills },
      });
    } catch (error) {
      renderErrorPage({
        response: res,
        title: "Internal Server Error",
        statusCode: error.statusCode || 500,
      });
    }
  }
  async courseDetail(req, res, next) {
    const { id } = req.params;
    try {
      render({
        response: res,
        title: "Class of Course",
        view: "Course/course-detail",
        data: { courseId: id },
      });
    } catch (error) {
      renderErrorPage({
        response: res,
        title: "Internal Server Error",
        statusCode: error.statusCode || 500,
      });
    }
  }
  async courseList(req, res, next) {
    const { id } = req.params;
    try {
      render({
        response: res,
        title: "Courses",
        view: "course/course-datatables",
        data: { courseId: id },
      });
    } catch (error) {
      renderErrorPage({
        response: res,
        title: "Internal Server Error",
        statusCode: error.statusCode || 500,
      });
    }
  }
  async lessonDetail(req, res, next) {
    const { id, classroomId } = req.params;
    const lesson = await LessonModel.findById(id);
    console.log(lesson);
    try {
      render({
        response: res,
        title: "Reviews",
        view: "Lessons/lesson-detail",
        data: { lessonDetail: lesson, classroomId: classroomId },
      });
    } catch (error) {
      renderErrorPage({
        response: res,
        title: "Internal Server Error",
        statusCode: error.statusCode || 500,
      });
    }
  }
  async reviewList(req, res, next) {
    try {
      render({
        response: res,
        title: "Reviews",
        view: "Reviews/review-list",
      });
    } catch (error) {
      renderErrorPage({
        response: res,
        title: "Internal Server Error",
        statusCode: error.statusCode || 500,
      });
    }
  }
  async productPage(req, res, next) {
    try {
      // const products = await ProductServices.view({ per_page: 12 }, Options.FILTER);
      render({
        response: res,
        title: "Products",
        view: "Ecommerce/product-list",
      });
    } catch (error) {
      renderErrorPage({
        response: res,
        title: "Internal Server Error",
        statusCode: error.statusCode || 500,
      });
    }
  }

  async productDetailPage(req, res, next) {
    try {
      const product = await ProductServices.view({ slug: req.params.slug }, Options.DETAIL);
      render({
        response: res,
        title: "Products Detail",
        view: "Ecommerce/ecommerce-product-detail",
        data: { detail: product },
      });
    } catch (error) {
      renderErrorPage({
        response: res,
        title: "Internal Server Error",
        statusCode: error.statusCode || 500,
      });
    }
  }

  async productAddPage(req, res, next) {
    try {
      render({
        response: res,
        title: "Add Products",
        view: "Ecommerce/ecommerce-add-product",
      });
    } catch (error) {
      renderErrorPage({
        response: res,
        title: "Internal Server Error",
        statusCode: error.statusCode || 500,
      });
    }
  }

  async boxicons(req, res, next) {
    render({
      response: res,
      title: "Boxicons",
      view: "Icons/icons-boxicons",
    });
  }
  async dripicons(req, res, next) {
    render({
      response: res,
      title: "Dripicons",
      view: "Icons/icons-dripicons",
    });
  }
  async fontawesome(req, res, next) {
    render({
      response: res,
      title: "Fontawesome",
      view: "Icons/icons-fontawesome",
    });
  }
  async material(req, res, next) {
    render({
      response: res,
      title: "Material",
      view: "Icons/icons-materialdesign",
    });
  }
  async unicons(req, res, next) {
    render({
      response: res,
      title: "Unicons",
      view: "Icons/icons-unicons",
    });
  }
}

module.exports = new PageController();