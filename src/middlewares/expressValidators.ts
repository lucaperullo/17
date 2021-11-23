import { Response } from "express";
import { body, check, oneOf, validationResult } from "express-validator";
import { Request } from "express-validator/src/base";

export const checkPrice = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  await check(
    "price",
    "The price value must be of minimum 0.99 with no limits for its maximum"
  )
    .exists({ checkFalsy: true, checkNull: true })
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 400,
      error: errors.array()[0].msg,
    });
  } else {
    next();
  }
};
export const checkName = async (
  req: { body: { name: Request } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { status: number; error: any }): void; new (): any };
    };
  },
  next: () => void
) => {
  await check(
    "name",
    "You must provide a name for the product of minimum 3 characters.❗"
  )
    .exists({ checkNull: true, checkFalsy: true })
    .isLength({
      min: 3,
    })
    .run(req);

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    res.status(400).json({
      status: 400,
      error: errors.array()[0].msg,
    });
  }
};

export const checkQuantity = async (
  req: Request,
  res: Response,
  next: (arg0: any) => void
) => {
  await check(
    "quantity",
    "You must provide a quantity wich is between 0 and 5000 units for a product."
  )
    .exists({ checkNull: true, checkFalsy: true })
    .isInt({
      min: 0,
      max: 5000,
    })
    .isFloat({
      min: 0,
      max: 5000,
    })
    .run(req);

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next(req);
  } else {
    res.status(400).json({
      status: 400,
      error: errors.array()[0].msg,
    });
  }
};

export const checkId = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  oneOf([
    check("id", "You must provide a valid id for the product.")
      .exists({ checkNull: true, checkFalsy: true })
      .isMongoId()
      .isLength({
        min: 24,
        max: 24,
      })
      .withMessage("The id must be 24 characters long"),
  ]).run(req.params.id);
  const errors = validationResult(req.params.id);
  if (errors.isEmpty()) {
    next();
  } else {
    res.status(400).json({
      status: 400,
      error: errors.array()[0].msg,
    });
  }
};

export const checkAll = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  console.log(req.body);
  await check(
    "name",
    "You must provide a name for the product of minimum 3 characters.❗"
  )
    .exists({ checkNull: true, checkFalsy: true })
    .isLength({
      min: 3,
    })
    .run(req),
    await check("imgUrl", "You must provide an image URL for the product.❗")
      .exists({ checkNull: true, checkFalsy: true })
      .isURL()
      .run(req),
    await check(
      "price",
      "The price value must be of minimum 0.99 with no limits for its maximum"
    )
      .exists({ checkNull: true, checkFalsy: true })

      .run(req),
    await check(
      "quantity",
      "You must provide a quantity wich is between 0 and 5000 units for a product."
    )
      .exists({ checkNull: true, checkFalsy: true })
      .isInt({
        min: 0,
        max: 5000,
      })
      .isFloat({
        min: 0,
        max: 5000,
      })
      .run(req);

  const errors = validationResult(req);

  if (errors.isEmpty()) {
    console.log(errors.isEmpty());
    next();
  } else {
    res.status(400).json({
      status: 400,
      error: errors.array()[0].msg,
    });
  }
};
