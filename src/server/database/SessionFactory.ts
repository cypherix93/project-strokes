import {SessionFactory as Factory} from "hydrate-mongodb";

export var SessionFactory;

export function initSessionFactory(sessionFactory: Factory)
{
    SessionFactory = sessionFactory;
}