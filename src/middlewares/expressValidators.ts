import { check, oneOf, validationResult } from "express-validator";

//TESTING

export const checkPrice = (req: any, res: any, next: any) => {
  try {
    console.log("checking");
    oneOf([
      check("price")
        .exists({ checkFalsy: true, checkNull: true })
        .withMessage(
          "The price value must be of minimum 0.99 with no limits for its maximum"
        )
        .isFloat({ min: 0.99 })
        .isInt({ min: 0.99 }),
    ]);
    const errors = validationResult(req.body.price);
    if (!errors.isEmpty()) {
      res.send(errors.array()[0].msg);
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const checkName = (req: any, res: any, next: any) => {
  try {
    console.log("checking");
    oneOf([
      check("name")
        .exists({ checkFalsy: true })
        .withMessage(
          "You must provide a name for the product of minimum 3 characters.❗"
        )
        .isLength({
          min: 3,
        }),
    ]);
    const errors = validationResult(req.body.name);
    if (errors.isEmpty()) {
      next();
    } else {
      res.send(errors.array()[0].msg);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const checkQuantity = (req: any, res: any, next: any) => {
  try {
    console.log("checking");
    oneOf([
      check("quantity")
        .exists({ checkFalsy: true })
        .withMessage(
          "You must provide a quantity wich is between 0 and 5000 units for a product."
        )
        .isInt({
          min: 0,
          max: 5000,
        })
        .isFloat({
          min: 0,
          max: 5000,
        }),
    ]);
    const errors = validationResult(req.body.quantity);
    if (errors.isEmpty()) {
      next(null);
    } else {
      res.send(errors.array()[0].msg);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const checkId = (req: any, res: any, next: any) => {
  try {
    console.log("checking");
    oneOf([
      check("id")
        .exists({ checkFalsy: true })
        .withMessage("You must provide a valid id for the product.")
        .isMongoId()
        .isLength({
          min: 24,
          max: 24,
        })
        .withMessage("The id must be 24 characters long"),
    ]);
    const errors = validationResult(req.params.id);
    if (errors.isEmpty()) {
      next();
    } else {
      res.send(errors.array()[0].msg);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const checkAll = async (req: any, res: any, next: any) => {
  try {
    console.log("checking");
    oneOf([
      check("name")
        .exists({ checkFalsy: true })
        .withMessage(
          "You must provide a name for the product of minimum 3 characters.❗"
        )
        .isLength({
          min: 3,
        }),
      check("price")
        .exists({ checkFalsy: true })
        .withMessage(
          "The price value must be of minimum 0.99 with no limits for its maximum"
        )
        .isFloat({ min: 0.99 })
        .isInt({ min: 0.99 }),

      check("quantity")
        .exists({ checkFalsy: true })
        .withMessage(
          "You must provide a quantity wich is between 0 and 5000 units for a product."
        )
        .isInt({
          min: 0,
          max: 5000,
        })
        .isFloat({
          min: 0,
          max: 5000,
        }),
    ]);
    console.log("checks done");
    const errors = validationResult(req.body);

    if (errors.isEmpty()) {
      next();
    } else {
      res.send(errors.array()[0].msg);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
